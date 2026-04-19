import { useEffect, useState } from "react";

import { getProfessorScreenData } from "../api/getProfilesData";
import ProfileIdentityCard from "../components/ProfileIdentityCard";
import { ProfessorScreenData } from "../types";
import { GoPencil } from "react-icons/go";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { PiBell } from "react-icons/pi";

export default function ProfessorProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ProfessorScreenData | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getProfessorScreenData();
                setData(result);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Erro ao carregar tela de professor.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, []);

    const renderMaterialCard = (material: ProfessorScreenData["materiais"][number]) => (
        <div key={material.id} className="fundo-material-book">
            <article className="material-book">
                <div className="book-cover">
                    <img
                        className="book-cover-image"
                        src={material.capa}
                        alt={`Capa do material ${material.titulo}`}
                    />
                    <div className="book-pages">{material.paginas} paginas</div>
                </div>
                <div className="book-footer">{material.subtitulo}</div>
            </article>
        </div>
    );

    return (
        <section className="professor-screen" aria-label="Tela de professor">
            {loading ? <p className="status-message">Carregando tela de professor...</p> : null}
            {error ? <p className="status-message status-error">{error}</p> : null}

            {data ? (
                <>
                    <div className="professor-top-layout">
                        <ProfileIdentityCard
                            className="professor-profile-card"
                            profile={data.perfil}
                            avatarLabel="NP"
                            tagClassName="tag-professor"
                            tagBackgroundColor="var(--salmon)"
                            tagBorderColor="var(--color-professor-tag-border)"
                            actionAriaLabel="Editar perfil do professor"
                            colorActionContent="#FAE0D9"
                        />

                        <article className="professor-details-card">
                            {data.detalhes.map((item) => (
                                <div key={item.rotulo} className="detail-row">
                                    <p>{item.rotulo}</p>
                                    <strong>{item.valor}</strong>
                                </div>
                            ))}
                        </article>
                    </div>

                    <div className="professor-actions">
                        <button type="button" className="action-event"><GoPencil /> Criar evento</button>
                        <button type="button" className="action-student"><IoPersonAddOutline /> Adicionar aluno</button>
                        <button type="button" className="action-post"><GoPencil /> Criar Publicacao</button>
                        <button type="button" className="action-panel"><MdPeople /> Painel de Alunos</button>
                    </div>

                    <h3 className="professor-title-band">Conteúdos publicados</h3>

                    <div className="professor-content-layout">
                        <div className="button-mais">
                            <div className="materials-grid">
                                {data.materiais.map((material) => renderMaterialCard(material))}
                            </div>

                            <button type="button" className="see-all-btn">ver todas</button>
                        </div>

                        <aside className="events-panel">
                            <header>
                                <h4>Eventos criados</h4>
                                <span style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: "#FAE0D9"
                                }}>
                                    <PiBell color="#4A4A4A" size={20} />
                                </span>
                            </header>
                            <ul>
                                {data.eventos.map((event) => (
                                    <li key={event.id}>
                                        <span className="event-badge">A</span>
                                        <div>
                                            <strong>{event.titulo}</strong>
                                            <p>{event.meta}</p>
                                        </div>
                                        <span className="event-edit">
                                            <GoPencil
                                                color="#4A4A4A"
                                            />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>

                </>
            ) : null}
        </section>
    );
}
