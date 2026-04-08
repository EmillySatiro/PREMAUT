-- ============================================================
-- 4) Views de apoio para consulta
-- ============================================================

CREATE SCHEMA IF NOT EXISTS premaut;
SET search_path TO premaut, public;

CREATE OR REPLACE VIEW vw_historico_timeline AS
SELECT
	he.aluno_id,
	'relatorio'::TEXT AS origem,
	r.id AS evento_id,
	r.data_referencia::TIMESTAMPTZ AS data_evento,
	r.resumo AS descricao,
	r.responsavel_id AS usuario_id
FROM historico_evolucao he
JOIN relatorios r ON r.historico_id = he.id
WHERE r.excluido_em IS NULL

UNION ALL

SELECT
	f.aluno_id,
	'feedback'::TEXT AS origem,
	f.id AS evento_id,
	f.data_envio AS data_evento,
	f.mensagem AS descricao,
	f.remetente_id AS usuario_id
FROM feedbacks f;

CREATE OR REPLACE VIEW vw_notificacoes_pendentes AS
SELECT
	n.id,
	n.usuario_id,
	n.tipo,
	n.assunto,
	n.mensagem,
	n.status,
	n.tentativas,
	n.criado_em
FROM notificacoes n
WHERE n.status IN ('pendente', 'falhou')
  AND n.tentativas < 3;
