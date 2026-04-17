import heroImage from "../../../shared/assets/img/Rectangle 2.png";
import leftArrow from "../../../shared/assets/icons/Vector.svg";
import rightArrow from "../../../shared/assets/icons/Vector-1.svg";
import "./HeroCarousel.css";

export default function HeroCarousel() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__card" aria-label="Banner principal do PREMAUT">
        <button className="hero__arrow hero__arrow--left" aria-label="Slide anterior">
          <img src={leftArrow} alt="" aria-hidden="true" />
        </button>

        <img
          className="hero__image"
          src={heroImage}
          alt="Campanha de conscientização sobre autismo"
        />

        <button className="hero__arrow hero__arrow--right" aria-label="Próximo slide">
          <img src={rightArrow} alt="" aria-hidden="true" />
        </button>

        <div className="hero__dots" aria-hidden="true">
          <span className="hero__dot hero__dot--active" />
          <span className="hero__dot" />
          <span className="hero__dot" />
          <span className="hero__dot" />
        </div>
      </div>
    </section>
  );
}
