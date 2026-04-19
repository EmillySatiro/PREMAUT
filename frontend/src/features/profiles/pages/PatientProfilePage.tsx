import { useEffect, useState } from "react";

import { getPatientScreenData } from "../api/getProfilesData";
import ProfileIdentityCard from "../components/ProfileIdentityCard";
import { PatientScreenData } from "../types";
import { TbUpload } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa6";

type PatientProfilePageProps = {
  studentId?: number;
};

function getInitials(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function PatientProfilePage({ studentId }: PatientProfilePageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PatientScreenData | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getPatientScreenData(studentId);
        setData(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao carregar tela de paciente.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [studentId]);

  return (
    <section className="patient-screen" aria-label="Tela de paciente">
      {loading ? <p className="status-message">Carregando tela de paciente...</p> : null}
      {error ? <p className="status-message status-error">{error}</p> : null}

      {data ? (
        <>
          <div className="patient-top-layout">
            <ProfileIdentityCard
              className="patient-profile-card"
              profile={data.perfil}
              avatarLabel={getInitials(data.perfil.nome)}
              tagClassName="tag-patient"
              tagBackgroundColor="rgba(var(--rgb-blue), 0.4)"
              tagBorderColor="var(--color-patient-tag-border)"
              actionAriaLabel="Editar perfil do paciente"
              colorActionContent="var(--blue)"
            />

            <article className="patient-support-card">
              <h3>Informacoes de suporte</h3>

              <div className="support-grid">
                <div className="support-column">
                  <p>Nivel de suporte</p>
                  <strong>{data.suporte.nivelSuporte}</strong>
                  <p>Comodidades</p>
                  <strong>{data.suporte.comodidades}</strong>
                  <p>Medicacao</p>
                  <strong>{data.suporte.medicacao}</strong>
                  <p>Atividade fisica</p>
                  <strong>{data.suporte.atividadeFisica}</strong>
                </div>

                <div className="support-column support-column-right">
                  <p>Estereotipia</p>
                  <strong>{data.suporte.estereotipia}</strong>
                  <p>Responsaveis</p>
                  <strong>{data.suporte.responsaveis}</strong>
                  <p>Reforcador</p>
                  <span>- Reforcador positivo</span>
                  <strong>{data.suporte.reforcadorPositivo}</strong>
                  <span>- Reforcador negativo</span>
                  <strong>{data.suporte.reforcadorNegativo}</strong>
                </div>
              </div>
            </article>
          </div>

          <div className="patient-file-actions">
            <button type="button" className="files-btn"><IoDocumentTextOutline /> visualizar Arquivos</button>
            <button type="button" className="upload-btn"><TbUpload /></button>
          </div>

          <h3 className="patient-title-band">Relatorios</h3>

          <div className="reports-area">
            <div className="content">
              <div className="reports-toolbar">
                <button type="button" className="feedback-btn"><FaRegCommentDots /> Feedback</button>
                <button type="button" className="write-btn"><GoPencil /> ESCREVER</button>
              </div>

              <div className="reports-list">
                {data.relatorios.map((report) => (
                  <article key={report.id} className="report-line">
                    <p>{report.titulo}</p>
                    <span>{report.data}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
