import { useEffect, useState } from "react";

import HomePage from "../features/home/components/HomePage";
import MateriaisPage from "../features/materials/components/MateriaisPage";
import PublicacoesPage from "../features/publicacoes/components/PublicacoesPage";


function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [previousPathname, setPreviousPathname] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setPreviousPathname(null);
      setPathname(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = (nextPathname: string) => {
    if (nextPathname === window.location.pathname) {
      return;
    }

    setPreviousPathname(pathname);
    window.history.pushState({}, "", nextPathname);
    setPathname(nextPathname);
  };

  const handleBackFromMateriais = () => {
    if (previousPathname === "/publicacoes") {
      navigate("/publicacoes");
      return;
    }

    navigate("/");
  };

  if (pathname === "/materiais") {
    return <MateriaisPage onNavigateHome={() => navigate("/")} onBack={handleBackFromMateriais} />;
  }

  if (pathname === "/publicacoes") {
    return <PublicacoesPage onNavigateHome={() => navigate("/")} onOpenMaterial={() => navigate("/materiais")} />;
  }

  return (
    <HomePage
      onViewMaterials={() => navigate("/materiais")}
      onViewPublicacoes={() => navigate("/publicacoes")}
    />
  );
}


export default App;