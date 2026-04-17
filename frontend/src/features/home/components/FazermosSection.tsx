import "./FazermosSection.css";

import mascotImage from "../../../shared/assets/img/RODOLFO PASSOS - PREMAUT - MASCOTE_page-0001 1.png";
import activityIcon from "../../../shared/assets/icons/dashicons_buddicons-activity.svg";
import arrowIcon from "../../../shared/assets/icons/mdi_arrow.svg";

const activities = [
  {
    id: 1,
    title: "atividade de leitura, escrita e matemática adaptadas",
    desc: "Jogos para linguagem para reconhecimento de letras, nome e números.",
  },
  {
    id: 2,
    title: "atividade de leitura, escrita e matemática adaptadas",
    desc: "jogos pedagógicos para selecionar emoções, atenção e memória.",
  },
  {
    id: 3,
    title: "Atividade de leitura, escrita e matemática adaptadas",
    desc: "jogos pedagógicos que trabalham classificação, sequência e raciocínio.",
  },
  {
    id: 4,
    title: "atividade de leitura, escrita e matemática adaptadas",
    desc: "jogos pedagógicos que estimulam coordenação, linguagem e memória.",
  },
];

export default function FazermosSection() {
  return (
    <section id="noticias" className="fazermos">
      <div className="fazermos__container">
        <div className="fazermos__left">
          <div className="fazermos__intro">
            <h2 className="fazermos__title">
              O que fazemos no
              <br />
              PREMAUT?
            </h2>
            <img className="fazermos__mascot" src={mascotImage} alt="Mascote do PREMAUT" />
          </div>
          <p className="fazermos__desc">
            Como o PREMAUT é um projeto de apoio a pessoas com autismo, as atividades podem ser
            adaptadas para trabalhar aspectos educacionais, sociais, emocionais e de integração
            comunitária. Aqui vai uma lista de sugestões que você pode usar ou ajustar conforme a
            proposta do projeto:
          </p>
          <button className="fazermos__cta" type="button">
            <span>Todas as atividades</span>
            <img src={arrowIcon} alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="fazermos__grid" aria-label="Atividades sugeridas">
          {activities.map((act) => (
            <article key={act.id} className="fazermos__card">
              <span className="fazermos__card-dot" aria-hidden="true">
                <img src={activityIcon} alt="" aria-hidden="true" />
              </span>
              <h3 className="fazermos__card-title">{act.title}</h3>
              <p className="fazermos__card-desc">{act.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
