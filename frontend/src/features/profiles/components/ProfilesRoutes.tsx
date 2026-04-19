import { useEffect, useState } from "react";

import "../styles/profiles.css";
import { ScreenId, StudentTile } from "../types";
import MonitorProfilePage from "../pages/MonitorProfilePage";
import PatientProfilePage from "../pages/PatientProfilePage";
import ProfessorProfilePage from "../pages/ProfessorProfilePage";
import ProfilesTopbar from "./ProfilesTopbar";

type RouteState = {
  screen: ScreenId;
  studentId?: number;
};

const PROFILE_PATHS: Record<ScreenId, string> = {
  professor: "/perfil/professor",
  monitor: "/perfil/monitor",
  paciente: "/perfil/paciente",
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function mapPathToScreen(pathname: string): ScreenId | null {
  const normalized = normalizePath(pathname);

  if (normalized === PROFILE_PATHS.professor) {
    return "professor";
  }

  if (normalized === PROFILE_PATHS.monitor) {
    return "monitor";
  }

  if (normalized === PROFILE_PATHS.paciente) {
    return "paciente";
  }

  return null;
}

function parseStudentId(search: string): number | undefined {
  const value = new URLSearchParams(search).get("aluno");

  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function readRouteState(): RouteState {
  const screen = mapPathToScreen(window.location.pathname) ?? "professor";

  if (screen !== "paciente") {
    return { screen };
  }

  return {
    screen,
    studentId: parseStudentId(window.location.search),
  };
}

function buildRouteUrl(screen: ScreenId, studentId?: number): string {
  const basePath = PROFILE_PATHS[screen];

  if (screen !== "paciente" || !studentId) {
    return basePath;
  }

  return `${basePath}?aluno=${studentId}`;
}

export default function ProfilesRoutes() {
  const [routeState, setRouteState] = useState<RouteState>(() => readRouteState());

  const navigateTo = (screen: ScreenId, options?: { studentId?: number; replace?: boolean }) => {
    const url = buildRouteUrl(screen, options?.studentId);

    if (options?.replace) {
      window.history.replaceState(null, "", url);
    } else {
      window.history.pushState(null, "", url);
    }

    setRouteState({
      screen,
      studentId: screen === "paciente" ? options?.studentId : undefined,
    });
  };

  useEffect(() => {
    const knownRoute = mapPathToScreen(window.location.pathname);

    if (!knownRoute) {
      navigateTo("professor", { replace: true });
    }

    const handlePopState = () => {
      setRouteState(readRouteState());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleOpenStudentProfile = (student: StudentTile) => {
    navigateTo("paciente", { studentId: student.id });
  };

  return (
    <main className={`profiles-root screen-${routeState.screen}`}>
      <ProfilesTopbar activeRoute={routeState.screen} onNavigate={(screen) => navigateTo(screen)} />

      <div className="mock-badge">Modo mockado no frontend. Estrutura pronta para integrar com banco depois.</div>

      <section className="profiles-canvas">
        {routeState.screen === "professor" ? <ProfessorProfilePage /> : null}
        {routeState.screen === "monitor" ? (
          <MonitorProfilePage onOpenStudentProfile={handleOpenStudentProfile} />
        ) : null}
        {routeState.screen === "paciente" ? <PatientProfilePage studentId={routeState.studentId} /> : null}
      </section>
    </main>
  );
}
