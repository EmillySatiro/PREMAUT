import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";

import { getMonitorScreenData } from "../api/getProfilesData";
import ProfileIdentityCard from "../components/ProfileIdentityCard";
import { MonitorScreenData, StudentTile } from "../types";

type MonitorProfilePageProps = {
  onOpenStudentProfile: (student: StudentTile) => void;
};

function getInitials(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function MonitorProfilePage({ onOpenStudentProfile }: MonitorProfilePageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MonitorScreenData | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getMonitorScreenData();
        setData(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao carregar tela de monitor.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <section className="monitor-screen" aria-label="Tela de monitor">
      {loading ? <p className="status-message">Carregando tela de monitor...</p> : null}
      {error ? <p className="status-message status-error">{error}</p> : null}

      {data ? (
        <>
          <div className="monitor-top-layout">
            <ProfileIdentityCard
              className="monitor-profile-card"
              profile={data.perfil}
              avatarLabel={getInitials(data.perfil.nome)}
              tagClassName="tag-monitor"
              tagBackgroundColor="var(--sand)"
              tagBorderColor="var(--color-monitor-tag-border)"
              actionAriaLabel="Editar perfil do monitor"
              colorActionContent="var(--color-monitor-border)"
            />

            <article className="monitor-details-card">
              {data.detalhes.map((item) => (
                <div key={item.rotulo} className="detail-row">
                  <p>{item.rotulo}</p>
                  <strong>{item.valor}</strong>
                </div>
              ))}
            </article>
          </div>

          <h3 className="monitor-title-band">Alunos vinculados</h3>

          <div className="monitor-students-area">
            <div className="students-grid">
              {data.alunos.map((student) => (
                <article key={student.id} className="student-tile">
                  <div className="student-avatar">{getInitials(student.nome)}</div>
                  <h4>{student.nome}</h4>
                  <button type="button" onClick={() => onOpenStudentProfile(student)}>
                    Verificar perfil
                  </button>
                </article>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
