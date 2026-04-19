
import { FaBars } from "react-icons/fa";
import HeartIcon from "../../../shared/icons/heart.svg";
import PremautLogo from "../../../shared/icons/premaut.svg";

import { ScreenId } from "../types";

type ProfilesTopbarProps = {
  activeRoute: ScreenId;
  onNavigate: (route: ScreenId) => void;
};

export default function ProfilesTopbar({ activeRoute, onNavigate }: ProfilesTopbarProps) {
  return (
    <header className="premaut-topbar">
      <div className="premaut-brand">
        <img src={HeartIcon} alt="Coração PREMAUT" className="brand-icon" />
        <img src={PremautLogo} alt="Logo PREMAUT" className="brand-logo" />
      </div>

      <nav className="screen-nav" aria-label="Selecao de telas">
        <button
          type="button"
          className={activeRoute === "professor" ? "is-active" : ""}
          onClick={() => onNavigate("professor")}
        >
          Professor
        </button>
        <button
          type="button"
          className={activeRoute === "monitor" ? "is-active" : ""}
          onClick={() => onNavigate("monitor")}
        >
          Monitor
        </button>
        <button
          type="button"
          className={activeRoute === "paciente" ? "is-active" : ""}
          onClick={() => onNavigate("paciente")}
        >
          Paciente
        </button>
      </nav>

      <button type="button" className="menu-toggle" aria-label="Abrir menu">
        <FaBars className="menu-icon" />
      </button>
    </header>
  );
}
