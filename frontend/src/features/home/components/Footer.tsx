import "./Footer.css";
import heartIcon from "../../../shared/assets/icons/solar_heart-broken.svg";
import instagramIcon from "../../../shared/assets/icons/mdi_instagram.svg";
import youtubeIcon from "../../../shared/assets/icons/mdi_youtube.svg";
import footerPattern from "../../../shared/assets/img/Rectangle 4.png";

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{ ["--footer-pattern" as string]: `url(${footerPattern})` }}
    >
      <div className="footer__container">
        <div className="footer__brand" aria-label="Marca PREMAUT">
          <img src={heartIcon} alt="" aria-hidden="true" className="footer__logo-icon" />
          <span className="footer__logo-text">PREMAUT</span>
        </div>

        <div className="footer__social" aria-label="Redes sociais">
          <a href="#" aria-label="Instagram" className="footer__social-link">
            <img src={instagramIcon} alt="" aria-hidden="true" />
          </a>
          <a href="#" aria-label="YouTube" className="footer__social-link">
            <img src={youtubeIcon} alt="" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
