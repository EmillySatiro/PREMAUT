-- ============================================================
-- 2) Indices de performance
-- ============================================================

CREATE SCHEMA IF NOT EXISTS premaut;
SET search_path TO premaut, public;

CREATE UNIQUE INDEX ux_usuarios_email_ci ON usuarios (LOWER(email));
CREATE INDEX ix_usuarios_tipo_ativo ON usuarios (tipo, ativo);

CREATE INDEX ix_alunos_status_nome ON alunos (status_ativo, nome);

CREATE UNIQUE INDEX ux_historico_aluno ON historico_evolucao (aluno_id);

CREATE UNIQUE INDEX ux_aluno_vinculo_ativo
	ON aluno_vinculos (aluno_id, usuario_id)
	WHERE ativo = TRUE;
CREATE INDEX ix_aluno_vinculos_usuario_ativo ON aluno_vinculos (usuario_id, ativo);

CREATE INDEX ix_materiais_categoria_data ON materiais_apoio (categoria, data_upload DESC);
CREATE INDEX ix_materiais_autor_data ON materiais_apoio (autor_id, data_upload DESC);

CREATE INDEX ix_relatorios_historico_data ON relatorios (historico_id, data_referencia DESC);
CREATE INDEX ix_relatorios_responsavel_data ON relatorios (responsavel_id, data_referencia DESC);

CREATE INDEX ix_feedback_destinatario_data ON feedbacks (destinatario_id, data_envio DESC);
CREATE INDEX ix_feedback_aluno_data ON feedbacks (aluno_id, data_envio DESC);

CREATE INDEX ix_rel_periodico_aluno_data ON relatorios_periodicos (aluno_id, data_inicio, data_fim);

CREATE INDEX ix_notificacoes_fila ON notificacoes (status, tentativas, criado_em);
CREATE INDEX ix_notificacoes_usuario_data ON notificacoes (usuario_id, criado_em DESC);

CREATE INDEX ix_logs_usuario_data ON log_operacoes (usuario_id, criado_em DESC);
CREATE INDEX ix_paginas_ativas_ordem ON paginas_publicas (ativo, ordem_exibicao);
