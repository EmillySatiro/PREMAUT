-- ============================================================
-- PREMAUT - Schema relacional completo (PostgreSQL)
-- Baseado em UC-01..UC-10, DS-01..DS-10, RF-01..RF-10 e RN-01..RN-09
-- ============================================================

BEGIN;

CREATE SCHEMA IF NOT EXISTS premaut;
SET search_path TO premaut, public;

-- ============================================================
-- 1) Tabelas centrais
-- ============================================================

CREATE TABLE usuarios (
	id BIGSERIAL PRIMARY KEY,
	nome VARCHAR(120) NOT NULL,
	email VARCHAR(160) NOT NULL,
	senha_sha256 CHAR(64) NOT NULL CHECK (senha_sha256 ~* '^[0-9a-f]{64}$'),
	tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('administrador', 'professor', 'monitor')),
	tentativas_login SMALLINT NOT NULL DEFAULT 0 CHECK (tentativas_login BETWEEN 0 AND 3),
	bloqueado_ate TIMESTAMPTZ,
	ativo BOOLEAN NOT NULL DEFAULT TRUE,
	ultimo_login_em TIMESTAMPTZ,
	criado_por BIGINT,
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_usuarios_criado_por
		FOREIGN KEY (criado_por) REFERENCES usuarios (id) ON DELETE SET NULL,
	CONSTRAINT ck_usuario_bloqueio_coerente
		CHECK ((tentativas_login < 3) OR (bloqueado_ate IS NOT NULL))
);

CREATE TABLE alunos (
	id BIGSERIAL PRIMARY KEY,
	nome VARCHAR(120) NOT NULL,
	data_nascimento DATE,
	contato VARCHAR(120),
	info_medica TEXT,
	responsavel_nome VARCHAR(120),
	responsavel_contato VARCHAR(120),
	foto_url TEXT,
	status_ativo BOOLEAN NOT NULL DEFAULT TRUE,
	data_desligamento DATE,
	criado_por BIGINT,
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_alunos_criado_por
		FOREIGN KEY (criado_por) REFERENCES usuarios (id) ON DELETE SET NULL,
	CONSTRAINT ck_aluno_status_desligamento
		CHECK (
			(status_ativo = TRUE AND data_desligamento IS NULL)
			OR (status_ativo = FALSE AND data_desligamento IS NOT NULL)
		)
);

CREATE TABLE historico_evolucao (
	id BIGSERIAL PRIMARY KEY,
	aluno_id BIGINT NOT NULL UNIQUE,
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_historico_aluno
		FOREIGN KEY (aluno_id) REFERENCES alunos (id) ON DELETE RESTRICT
);

CREATE TABLE aluno_vinculos (
	id BIGSERIAL PRIMARY KEY,
	aluno_id BIGINT NOT NULL,
	usuario_id BIGINT NOT NULL,
	ativo BOOLEAN NOT NULL DEFAULT TRUE,
	inicio_vinculo DATE NOT NULL DEFAULT CURRENT_DATE,
	fim_vinculo DATE,
	criado_por BIGINT,
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_vinculo_aluno
		FOREIGN KEY (aluno_id) REFERENCES alunos (id) ON DELETE RESTRICT,
	CONSTRAINT fk_vinculo_usuario
		FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE RESTRICT,
	CONSTRAINT fk_vinculo_criado_por
		FOREIGN KEY (criado_por) REFERENCES usuarios (id) ON DELETE SET NULL,
	CONSTRAINT ck_vinculo_periodo
		CHECK (fim_vinculo IS NULL OR fim_vinculo >= inicio_vinculo)
);

CREATE TABLE materiais_apoio (
	id BIGSERIAL PRIMARY KEY,
	titulo VARCHAR(200) NOT NULL,
	categoria VARCHAR(30) NOT NULL CHECK (categoria IN ('pedagogico', 'esportivo', 'outro')),
	descricao TEXT,
    capa_url TEXT,
	caminho_arquivo TEXT NOT NULL,
	mime_type VARCHAR(100),
	tamanho_bytes BIGINT CHECK (tamanho_bytes IS NULL OR tamanho_bytes >= 0),
	autor_id BIGINT NOT NULL,
	publicado BOOLEAN NOT NULL DEFAULT TRUE,
	data_upload TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_material_autor
		FOREIGN KEY (autor_id) REFERENCES usuarios (id) ON DELETE RESTRICT
);

CREATE TABLE relatorios (
	id BIGSERIAL PRIMARY KEY,
	historico_id BIGINT NOT NULL,
	responsavel_id BIGINT NOT NULL,
	tipo_relatorio VARCHAR(20) NOT NULL DEFAULT 'evolucao'
		CHECK (tipo_relatorio IN ('evolucao', 'mensal', 'semestral')),
	data_referencia DATE NOT NULL DEFAULT CURRENT_DATE,
	periodo_inicio DATE,
	periodo_fim DATE,
	evolucao_motora TEXT,
	evolucao_esportiva TEXT,
	resumo TEXT NOT NULL,
	metricas JSONB NOT NULL DEFAULT '{}'::JSONB,
	versao INTEGER NOT NULL DEFAULT 1 CHECK (versao >= 1),
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	excluido_em TIMESTAMPTZ,
	CONSTRAINT fk_relatorio_historico
		FOREIGN KEY (historico_id) REFERENCES historico_evolucao (id) ON DELETE RESTRICT,
	CONSTRAINT fk_relatorio_responsavel
		FOREIGN KEY (responsavel_id) REFERENCES usuarios (id) ON DELETE RESTRICT,
	CONSTRAINT ck_relatorio_periodo_coerente
		CHECK (periodo_fim IS NULL OR periodo_inicio IS NULL OR periodo_fim >= periodo_inicio),
	CONSTRAINT ck_relatorio_periodo_obrigatorio
		CHECK (
			tipo_relatorio = 'evolucao'
			OR (periodo_inicio IS NOT NULL AND periodo_fim IS NOT NULL)
		)
);

CREATE TABLE feedbacks (
	id BIGSERIAL PRIMARY KEY,
	aluno_id BIGINT NOT NULL,
	remetente_id BIGINT NOT NULL,
	destinatario_id BIGINT NOT NULL,
	mensagem TEXT NOT NULL,
	data_envio TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	lido_em TIMESTAMPTZ,
	atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_feedback_aluno
		FOREIGN KEY (aluno_id) REFERENCES alunos (id) ON DELETE RESTRICT,
	CONSTRAINT fk_feedback_remetente
		FOREIGN KEY (remetente_id) REFERENCES usuarios (id) ON DELETE RESTRICT,
	CONSTRAINT fk_feedback_destinatario
		FOREIGN KEY (destinatario_id) REFERENCES usuarios (id) ON DELETE RESTRICT,
	CONSTRAINT ck_feedback_usuarios_distintos
		CHECK (remetente_id <> destinatario_id)
);

CREATE TABLE relatorios_periodicos (
	id BIGSERIAL PRIMARY KEY,
	aluno_id BIGINT NOT NULL,
	gerado_por_id BIGINT NOT NULL,
	periodicidade VARCHAR(10) NOT NULL CHECK (periodicidade IN ('mensal', 'semestral')),
	data_inicio DATE NOT NULL,
	data_fim DATE NOT NULL,
	resumo TEXT,
	arquivo_pdf_url TEXT,
	metricas_consolidadas JSONB NOT NULL DEFAULT '{}'::JSONB,
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_relatorio_periodico_aluno
		FOREIGN KEY (aluno_id) REFERENCES alunos (id) ON DELETE RESTRICT,
	CONSTRAINT fk_relatorio_periodico_gerador
		FOREIGN KEY (gerado_por_id) REFERENCES usuarios (id) ON DELETE RESTRICT,
	CONSTRAINT ck_relatorio_periodico_periodo
		CHECK (data_fim >= data_inicio),
	CONSTRAINT uq_relatorio_periodico_unico
		UNIQUE (aluno_id, periodicidade, data_inicio, data_fim)
);

CREATE TABLE notificacoes (
	id BIGSERIAL PRIMARY KEY,
	usuario_id BIGINT NOT NULL,
	tipo VARCHAR(30) NOT NULL CHECK (tipo IN ('novo_relatorio', 'novo_feedback', 'conta_bloqueada', 'sistema')),
	canal VARCHAR(15) NOT NULL DEFAULT 'email' CHECK (canal IN ('email', 'in_app')),
	assunto VARCHAR(160) NOT NULL,
	mensagem TEXT NOT NULL,
	payload JSONB NOT NULL DEFAULT '{}'::JSONB,
	status VARCHAR(12) NOT NULL DEFAULT 'pendente'
		CHECK (status IN ('pendente', 'enviada', 'falhou', 'cancelada')),
	tentativas SMALLINT NOT NULL DEFAULT 0 CHECK (tentativas BETWEEN 0 AND 3),
	ultima_tentativa_em TIMESTAMPTZ,
	enviado_em TIMESTAMPTZ,
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_notificacao_usuario
		FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE RESTRICT,
	CONSTRAINT ck_notificacao_status_envio
		CHECK (
			(status IN ('pendente', 'falhou') AND enviado_em IS NULL)
			OR (status = 'enviada' AND enviado_em IS NOT NULL)
			OR (status = 'cancelada')
		)
);

CREATE TABLE notificacao_tentativas (
	id BIGSERIAL PRIMARY KEY,
	notificacao_id BIGINT NOT NULL,
	tentativa_num SMALLINT NOT NULL CHECK (tentativa_num BETWEEN 1 AND 3),
	status VARCHAR(10) NOT NULL CHECK (status IN ('enviada', 'falhou')),
	resposta_provedor TEXT,
	executado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_notificacao_tentativa_notificacao
		FOREIGN KEY (notificacao_id) REFERENCES notificacoes (id) ON DELETE CASCADE,
	CONSTRAINT uq_notificacao_tentativa
		UNIQUE (notificacao_id, tentativa_num)
);

CREATE TABLE log_operacoes (
	id BIGSERIAL PRIMARY KEY,
	usuario_id BIGINT,
	acao VARCHAR(120) NOT NULL,
	entidade VARCHAR(60),
	entidade_id BIGINT,
	detalhes JSONB NOT NULL DEFAULT '{}'::JSONB,
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_log_usuario
		FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE SET NULL
);

CREATE TABLE paginas_publicas (
	id BIGSERIAL PRIMARY KEY,
	slug VARCHAR(80) NOT NULL UNIQUE,
	titulo VARCHAR(200) NOT NULL,
	conteudo TEXT NOT NULL,
	ordem_exibicao INTEGER NOT NULL DEFAULT 0,
	ativo BOOLEAN NOT NULL DEFAULT TRUE,
	atualizado_por BIGINT,
	publicado_em TIMESTAMPTZ,
	atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_pagina_editor
		FOREIGN KEY (atualizado_por) REFERENCES usuarios (id) ON DELETE SET NULL
);

CREATE TABLE contatos_publicos (
	id BIGSERIAL PRIMARY KEY,
	nome VARCHAR(120) NOT NULL,
	email VARCHAR(160) NOT NULL,
	telefone VARCHAR(40),
	mensagem TEXT NOT NULL,
	origem_pagina VARCHAR(80),
	status VARCHAR(20) NOT NULL DEFAULT 'novo'
		CHECK (status IN ('novo', 'em_atendimento', 'respondido', 'arquivado')),
	criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	respondido_em TIMESTAMPTZ
);

COMMIT;


