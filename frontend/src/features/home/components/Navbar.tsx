import heartIcon from "../../../shared/assets/icons/solar_heart-broken.svg";
import patientIcon from "../../../shared/assets/icons/fluent_patient-20-filled.svg";
import navPattern from "../../../shared/assets/img/Rectangle 4.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header
      className="navbar"
      style={{ ["--navbar-pattern" as string]: `url(${navPattern})` }}
    >
      <div className="navbar__logo">
        <img src={heartIcon} alt="" aria-hidden="true" className="navbar__logo-icon" />
        <span className="navbar__logo-text">PREMAUT</span>
      </div>

      <nav className="navbar__nav" aria-label="Navegação principal">
        <a href="#inicio" className="navbar__link">Início</a>
        <a href="#noticias" className="navbar__link">Notícias</a>
        <a href="#sobre" className="navbar__link">Sobre</a>
        <a href="#notificacoes" className="navbar__link">Notificações</a>
      </nav>

      <button className="navbar__login" type="button" aria-label="Entrar">
        <img src={patientIcon} alt="" aria-hidden="true" className="navbar__login-icon-image" />
        <span>Entrar</span>
      </button>
    </header>
  );
}
