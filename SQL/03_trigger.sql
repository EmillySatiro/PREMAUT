-- ============================================================
-- 3) Funcoes e triggers de regra de negocio
-- ============================================================

CREATE SCHEMA IF NOT EXISTS premaut;
SET search_path TO premaut, public;

CREATE OR REPLACE FUNCTION fn_set_atualizado_em()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
	NEW.atualizado_em := NOW();
	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_aplicar_bloqueio_login()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
	IF NEW.tentativas_login >= 3 THEN
		NEW.tentativas_login := 3;
		IF NEW.bloqueado_ate IS NULL OR NEW.bloqueado_ate < NOW() THEN
			NEW.bloqueado_ate := NOW() + INTERVAL '15 minutes';
		END IF;
	ELSIF NEW.tentativas_login = 0 THEN
		NEW.bloqueado_ate := NULL;
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_validar_criador_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
	v_tipo VARCHAR(20);
BEGIN
	IF NEW.criado_por IS NULL THEN
		RETURN NEW;
	END IF;

	SELECT tipo INTO v_tipo
	FROM usuarios
	WHERE id = NEW.criado_por;

	IF v_tipo IS NULL THEN
		RAISE EXCEPTION 'Usuario criador % nao encontrado.', NEW.criado_por;
	END IF;

	IF v_tipo <> 'administrador' THEN
		RAISE EXCEPTION 'Apenas administradores podem cadastrar usuarios (RN-01).';
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_validar_criador_aluno()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
	v_tipo VARCHAR(20);
BEGIN
	IF NEW.criado_por IS NULL THEN
		RETURN NEW;
	END IF;

	SELECT tipo INTO v_tipo
	FROM usuarios
	WHERE id = NEW.criado_por;

	IF v_tipo IS NULL THEN
		RAISE EXCEPTION 'Usuario criador % nao encontrado.', NEW.criado_por;
	END IF;

	IF v_tipo NOT IN ('administrador', 'professor') THEN
		RAISE EXCEPTION 'Aluno deve ser cadastrado por administrador ou professor.';
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_criar_historico_automatico()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
	INSERT INTO historico_evolucao (aluno_id) VALUES (NEW.id);
	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_validar_vinculo_aluno_usuario()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
	v_tipo_usuario VARCHAR(20);
	v_tipo_criador VARCHAR(20);
BEGIN
	SELECT tipo INTO v_tipo_usuario
	FROM usuarios
	WHERE id = NEW.usuario_id
	  AND ativo = TRUE;

	IF v_tipo_usuario IS NULL THEN
		RAISE EXCEPTION 'Usuario % inexistente ou inativo.', NEW.usuario_id;
	END IF;

	IF v_tipo_usuario NOT IN ('monitor', 'professor') THEN
		RAISE EXCEPTION 'Somente monitor ou professor pode ser vinculado a aluno (RN-03).';
	END IF;

	IF NEW.criado_por IS NOT NULL THEN
		SELECT tipo INTO v_tipo_criador
		FROM usuarios
		WHERE id = NEW.criado_por;

		IF v_tipo_criador NOT IN ('administrador', 'professor') THEN
			RAISE EXCEPTION 'Vinculo deve ser criado por administrador ou professor.';
		END IF;
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_validar_material_apoio()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
	v_tipo VARCHAR(20);
BEGIN
	SELECT tipo INTO v_tipo
	FROM usuarios
	WHERE id = NEW.autor_id
	  AND ativo = TRUE;

	IF v_tipo IS NULL THEN
		RAISE EXCEPTION 'Autor % inexistente ou inativo.', NEW.autor_id;
	END IF;
    
	IF v_tipo NOT IN ('monitor', 'professor') THEN
		RAISE EXCEPTION 'Material de apoio so pode ser cadastrado por monitor/professor (RN-05).';
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_validar_relatorio()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
	v_tipo_responsavel VARCHAR(20);
	v_aluno_id BIGINT;
	v_vinculado BOOLEAN;
BEGIN
	SELECT aluno_id INTO v_aluno_id
	FROM historico_evolucao
	WHERE id = NEW.historico_id;

	IF v_aluno_id IS NULL THEN
		RAISE EXCEPTION 'Historico % nao encontrado para o relatorio.', NEW.historico_id;
	END IF;

	SELECT tipo INTO v_tipo_responsavel
	FROM usuarios
	WHERE id = NEW.responsavel_id
	  AND ativo = TRUE;

	IF v_tipo_responsavel NOT IN ('monitor', 'professor') THEN
		RAISE EXCEPTION 'Responsavel do relatorio deve ser monitor/professor (RN-03).';
	END IF;

	SELECT EXISTS (
		SELECT 1
		FROM aluno_vinculos av
		WHERE av.aluno_id = v_aluno_id
		  AND av.usuario_id = NEW.responsavel_id
		  AND av.ativo = TRUE
	)
	INTO v_vinculado;

	IF NOT v_vinculado THEN
		RAISE EXCEPTION 'Usuario % nao esta vinculado ao aluno % (RN-03).', NEW.responsavel_id, v_aluno_id;
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_validar_feedback()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
	v_tipo_remetente VARCHAR(20);
	v_tipo_destinatario VARCHAR(20);
	v_remetente_vinculado BOOLEAN;
	v_destinatario_vinculado BOOLEAN;
BEGIN
	IF NEW.aluno_id IS NULL THEN
		RAISE EXCEPTION 'Feedback deve estar vinculado a um aluno (RN-04).';
	END IF;

	SELECT tipo INTO v_tipo_remetente
	FROM usuarios
	WHERE id = NEW.remetente_id
	  AND ativo = TRUE;

	SELECT tipo INTO v_tipo_destinatario
	FROM usuarios
	WHERE id = NEW.destinatario_id
	  AND ativo = TRUE;

	IF v_tipo_remetente NOT IN ('monitor', 'professor') THEN
		RAISE EXCEPTION 'Remetente de feedback deve ser monitor/professor.';
	END IF;

	IF v_tipo_destinatario NOT IN ('monitor', 'professor') THEN
		RAISE EXCEPTION 'Destinatario de feedback deve ser monitor/professor.';
	END IF;

	SELECT EXISTS (
		SELECT 1
		FROM aluno_vinculos
		WHERE aluno_id = NEW.aluno_id
		  AND usuario_id = NEW.remetente_id
		  AND ativo = TRUE
	)
	INTO v_remetente_vinculado;

	SELECT EXISTS (
		SELECT 1
		FROM aluno_vinculos
		WHERE aluno_id = NEW.aluno_id
		  AND usuario_id = NEW.destinatario_id
		  AND ativo = TRUE
	)
	INTO v_destinatario_vinculado;

	IF NOT v_remetente_vinculado OR NOT v_destinatario_vinculado THEN
		RAISE EXCEPTION 'Remetente e destinatario devem estar vinculados ao aluno do feedback.';
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_validar_relatorio_periodico()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
	v_tipo VARCHAR(20);
BEGIN
	SELECT tipo INTO v_tipo
	FROM usuarios
	WHERE id = NEW.gerado_por_id
	  AND ativo = TRUE;

	IF v_tipo NOT IN ('administrador', 'professor') THEN
		RAISE EXCEPTION 'Relatorio periodico deve ser gerado por administrador/professor (RF-10).';
	END IF;

	IF NEW.data_fim < NEW.data_inicio THEN
		RAISE EXCEPTION 'Periodo invalido para relatorio periodico.';
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_validar_editor_pagina_publica()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
	v_tipo VARCHAR(20);
BEGIN
	IF NEW.atualizado_por IS NULL THEN
		RETURN NEW;
	END IF;

	SELECT tipo INTO v_tipo
	FROM usuarios
	WHERE id = NEW.atualizado_por
	  AND ativo = TRUE;

	IF v_tipo <> 'administrador' THEN
		RAISE EXCEPTION 'Apenas administradores podem publicar/editar paginas publicas.';
	END IF;

	RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_impedir_delete_aluno()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
	RAISE EXCEPTION 'Exclusao fisica de aluno nao permitida. Use status_ativo = FALSE para preservar historico (RN-09).';
END;
$$;

CREATE OR REPLACE FUNCTION fn_impedir_delete_usuario()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
	RAISE EXCEPTION 'Exclusao fisica de usuario nao permitida. Use ativo = FALSE para preservar rastreabilidade.';
END;
$$;

CREATE TRIGGER trg_usuarios_set_atualizado_em
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

CREATE TRIGGER trg_alunos_set_atualizado_em
BEFORE UPDATE ON alunos
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

CREATE TRIGGER trg_historico_set_atualizado_em
BEFORE UPDATE ON historico_evolucao
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

CREATE TRIGGER trg_vinculos_set_atualizado_em
BEFORE UPDATE ON aluno_vinculos
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

CREATE TRIGGER trg_materiais_set_atualizado_em
BEFORE UPDATE ON materiais_apoio
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

CREATE TRIGGER trg_relatorios_set_atualizado_em
BEFORE UPDATE ON relatorios
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

CREATE TRIGGER trg_feedbacks_set_atualizado_em
BEFORE UPDATE ON feedbacks
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

CREATE TRIGGER trg_paginas_set_atualizado_em
BEFORE UPDATE ON paginas_publicas
FOR EACH ROW
EXECUTE FUNCTION fn_set_atualizado_em();

CREATE TRIGGER trg_usuarios_bloqueio_login
BEFORE INSERT OR UPDATE OF tentativas_login, bloqueado_ate ON usuarios
FOR EACH ROW
EXECUTE FUNCTION fn_aplicar_bloqueio_login();

CREATE TRIGGER trg_usuarios_validar_criador
BEFORE INSERT OR UPDATE OF criado_por ON usuarios
FOR EACH ROW
EXECUTE FUNCTION fn_validar_criador_admin();

CREATE TRIGGER trg_alunos_validar_criador
BEFORE INSERT OR UPDATE OF criado_por ON alunos
FOR EACH ROW
EXECUTE FUNCTION fn_validar_criador_aluno();

CREATE TRIGGER trg_alunos_criar_historico
AFTER INSERT ON alunos
FOR EACH ROW
EXECUTE FUNCTION fn_criar_historico_automatico();

CREATE TRIGGER trg_vinculos_validar
BEFORE INSERT OR UPDATE ON aluno_vinculos
FOR EACH ROW
EXECUTE FUNCTION fn_validar_vinculo_aluno_usuario();

CREATE TRIGGER trg_materiais_validar
BEFORE INSERT OR UPDATE OF autor_id ON materiais_apoio
FOR EACH ROW
EXECUTE FUNCTION fn_validar_material_apoio();

CREATE TRIGGER trg_relatorios_validar
BEFORE INSERT OR UPDATE OF historico_id, responsavel_id ON relatorios
FOR EACH ROW
EXECUTE FUNCTION fn_validar_relatorio();

CREATE TRIGGER trg_feedbacks_validar
BEFORE INSERT OR UPDATE OF aluno_id, remetente_id, destinatario_id ON feedbacks
FOR EACH ROW
EXECUTE FUNCTION fn_validar_feedback();

CREATE TRIGGER trg_relatorios_periodicos_validar
BEFORE INSERT OR UPDATE ON relatorios_periodicos
FOR EACH ROW
EXECUTE FUNCTION fn_validar_relatorio_periodico();

CREATE TRIGGER trg_paginas_validar_editor
BEFORE INSERT OR UPDATE OF atualizado_por ON paginas_publicas
FOR EACH ROW
EXECUTE FUNCTION fn_validar_editor_pagina_publica();

CREATE TRIGGER trg_alunos_impedir_delete
BEFORE DELETE ON alunos
FOR EACH ROW
EXECUTE FUNCTION fn_impedir_delete_aluno();

CREATE TRIGGER trg_usuarios_impedir_delete
BEFORE DELETE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION fn_impedir_delete_usuario();