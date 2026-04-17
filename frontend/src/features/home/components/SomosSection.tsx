import "./SomosSection.css";

import starIcon from "../../../shared/assets/icons/material-symbols_star-rounded.svg";
import somosBg from "../../../shared/assets/img/Rectangle 4-1.png";

const stats = [
  { value: "10+", label: "Funcionários" },
  { value: "100+", label: "Pacientes" },
  { value: "7+", label: "Anos" },
  { value: "12+", label: "Alguma coisa" },
];

export default function SomosSection() {
  return (
    <section
      id="sobre"
      className="somos"
      style={{ ["--somos-bg" as string]: `url(${somosBg})` }}
    >
      <div className="somos__container">
        <div className="somos__label">
          <img src={starIcon} alt="" aria-hidden="true" />
          <span>Somos</span>
        </div>

        <p className="somos__text">
          O é um projeto inovador voltado para o apoio e a inclusão de pessoas com autismo. Seu
          objetivo principal é promover o desenvolvimento de habilidades sociais, educacionais e
          emocionais, oferecendo recursos acessíveis que auxiliam tanto no cotidiano quanto na
          construção de uma vida mais autônoma e participativa.
        </p>

        <div className="somos__stats" aria-label="Indicadores do projeto">
          {stats.map((stat) => (
            <div key={stat.label} className="somos__stat-card">
              <strong className="somos__stat-value">{stat.value}</strong>
              <span className="somos__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
