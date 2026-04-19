import "./MateriaisPage.css";

import heartIcon from "../../../shared/assets/icons/solar_heart-broken.svg";
import bookCover from "../../../shared/assets/img/source/Meu Filho Autista.jpg";
import topPattern from "../../../shared/assets/img/Rectangle 4.png";

interface MateriaisPageProps {
  onNavigateHome: () => void;
  onBack: () => void;
}

const skeletonCards = [
  {
    id: 1,
    variant: "feature",
    lines: [88, 92, 84, 74],
  },
  {
    id: 2,
    variant: "text-only",
    lines: [96, 92, 88, 86, 84, 90, 87, 93],
  },
  {
    id: 3,
    variant: "text-only",
    lines: [96, 93, 88, 91, 89, 94, 86, 92],
  },
  {
    id: 4,
    variant: "text-only",
    lines: [95, 90, 87, 92, 89, 94, 88, 91],
  },
];

export default function MateriaisPage({ onNavigateHome, onBack }: MateriaisPageProps) {
  return (
    <div className="materiais-page">
      <header
        className="materiais-page__topbar"
        style={{ ["--top-pattern" as string]: `url(${topPattern})` }}
      >
        <button className="materiais-page__brand" type="button" onClick={onNavigateHome} aria-label="PREMAUT">
          <img src={heartIcon} alt="" aria-hidden="true" className="materiais-page__brand-icon" />
          <span className="materiais-page__brand-text">PREMAUT</span>
        </button>

        <button className="materiais-page__menu" type="button" aria-label="Abrir menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="materiais-page__main">
        <button className="materiais-page__back" type="button" onClick={onBack} aria-label="Voltar">
          <span className="materiais-page__back-icon" aria-hidden="true" />
        </button>

        <section className="materiais-page__hero" aria-label="Material em destaque">
          <div className="materiais-page__hero-coverWrap">
            <img
              src={bookCover}
              alt="Capa do livro Meu filho é autista e agora?"
              className="materiais-page__hero-cover"
            />
          </div>

          <div className="materiais-page__hero-copy">
            <h1 className="materiais-page__title">Meu filho é autista e agora?</h1>
            <p className="materiais-page__desc">
              O livro fala sobre o impacto que o diagnóstico de autismo causa em uma família e como os
              pais podem lidar com essa nova realidade. A autora, que é mãe e professora, mistura
              conhecimento prático com sua experiência pessoal, trazendo um tom de conversa e
              acolhimento.
            </p>
          </div>
        </section>

        <section className="materiais-page__content" aria-label="Conteúdo do material">
          {skeletonCards.map((card) => (
            <article key={card.id} className="materiais-page__card">
              {card.variant === "feature" ? (
                <>
                  <div className="materiais-page__feature-row">
                    <div className="materiais-page__thumb" aria-hidden="true" />

                    <div className="materiais-page__feature-lines" aria-hidden="true">
                      {card.lines.map((width, index) => (
                        <span
                          key={`${card.id}-${index}`}
                          className="materiais-page__line"
                          style={{ width: `${width}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="materiais-page__paragraph-lines" aria-hidden="true">
                    {new Array(8).fill(null).map((_, index) => (
                      <span key={`${card.id}-paragraph-${index}`} className="materiais-page__line" />
                    ))}
                  </div>
                </>
              ) : (
                <div
                  className="materiais-page__paragraph-lines materiais-page__paragraph-lines--tall"
                  aria-hidden="true"
                >
                  {card.lines.map((width, index) => (
                    <span
                      key={`${card.id}-${index}`}
                      className="materiais-page__line"
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}