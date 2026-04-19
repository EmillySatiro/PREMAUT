import "./PublicacoesPage.css";

import heartIcon from "../../../shared/assets/icons/solar_heart-broken.svg";
import bookCover from "../../../shared/assets/img/source/Meu Filho Autista.jpg";
import topPattern from "../../../shared/assets/img/Rectangle 4.png";

interface PublicacoesPageProps {
  onNavigateHome: () => void;
  onOpenMaterial: () => void;
}

const publications = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: "livro de apoio",
  pages: "189 paginas",
}));

export default function PublicacoesPage({ onNavigateHome, onOpenMaterial }: PublicacoesPageProps) {
  return (
    <div className="publicacoes-page">
      <header
        className="publicacoes-page__topbar"
        style={{ ["--top-pattern" as string]: `url(${topPattern})` }}
      >
        <button className="publicacoes-page__brand" type="button" onClick={onNavigateHome} aria-label="PREMAUT">
          <img src={heartIcon} alt="" aria-hidden="true" className="publicacoes-page__brand-icon" />
          <span className="publicacoes-page__brand-text">PREMAUT</span>
        </button>

        <button className="publicacoes-page__menu" type="button" aria-label="Abrir menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="publicacoes-page__main">
        <section className="publicacoes-page__toolbar" aria-label="Busca de publicações">
          <div className="publicacoes-page__search">
            <input
              className="publicacoes-page__search-input"
              type="search"
              placeholder="Pesquisa"
              aria-label="Pesquisar publicações"
            />
            <span className="publicacoes-page__search-icon" aria-hidden="true" />
          </div>
        </section>

        <section className="publicacoes-page__gallery" aria-label="Visualização geral das publicações">
          <div className="publicacoes-page__grid">
            {publications.map((publication) => (
              <button
                key={publication.id}
                type="button"
                className="publicacoes-page__card"
                onClick={onOpenMaterial}
                aria-label={`Abrir material ${publication.title}`}
              >
                <div className="publicacoes-page__card-media">
                  <img
                    src={bookCover}
                    alt="Capa da publicação"
                    className="publicacoes-page__card-cover"
                  />
                  <span className="publicacoes-page__badge">{publication.pages}</span>
                </div>

                <div className="publicacoes-page__card-footer">
                  <span>{publication.title}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}