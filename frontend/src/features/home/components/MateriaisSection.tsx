import "./MateriaisSection.css";
import bookCover from "../../../shared/assets/img/source/Meu Filho Autista.jpg";
import dotsIcon from "../../../shared/assets/icons/bolihas.svg";

const books = [
  { id: 1, name: "livro de apoio", pages: "189 páginas" },
  { id: 2, name: "livro de apoio", pages: "189 páginas" },
  { id: 3, name: "livro de apoio", pages: "189 páginas" },
  { id: 4, name: "livro de apoio", pages: "189 páginas" },
];

interface MateriaisSectionProps {
  onViewMaterials?: () => void;
  onViewPublicacoes?: () => void;
}

export default function MateriaisSection({ onViewMaterials, onViewPublicacoes }: MateriaisSectionProps) {
  return (
    <section id="notificacoes" className="materiais">
      <div className="materiais__container">
        <div className="materiais__header">
          <h2 className="materiais__title">Materiais de apoio</h2>
          <p className="materiais__desc">
            Livros, PDFs, artigos e outros materiais de apoio que podem ajudar você.
          </p>
          <button
            className="materiais__more"
            type="button"
            onClick={onViewPublicacoes ?? onViewMaterials}
          >
            Ver mais
          </button>
        </div>

        <div className="materiais__track" aria-label="Materiais de apoio">
          {books.map((book) => (
            <button
              key={book.id}
              type="button"
              className="materiais__book"
              onClick={onViewMaterials}
              aria-label={`Abrir material ${book.name}`}
            >
              <div className="materiais__book-media">
                <img src={bookCover} alt={book.name} className="materiais__book-cover" />
                <span className="materiais__book-badge">{book.pages}</span>
              </div>
              <div className="materiais__book-footer">
                <span>{book.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="materiais__dots" aria-hidden="true">
          <img src={dotsIcon} alt="" />
        </div>
      </div>
    </section>
  );
}
