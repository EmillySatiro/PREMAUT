import { useEffect, useState } from "react";

import HomePage from "../features/home/components/HomePage";
import MateriaisPage from "../features/materials/components/MateriaisPage";


function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
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

    window.history.pushState({}, "", nextPathname);
    setPathname(nextPathname);
  };

  if (pathname === "/materiais") {
    return <MateriaisPage onNavigateHome={() => navigate("/")} onBack={() => navigate("/")} />;
  }

  return <HomePage onViewMaterials={() => navigate("/materiais")} />;
}


export default App;