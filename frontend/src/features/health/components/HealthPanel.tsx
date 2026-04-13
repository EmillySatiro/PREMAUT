import { useEffect, useState } from "react";

import { API_BASE_URL } from "../../../shared/config/environment";
import { getHealth } from "../api/getHealth";
import { HealthResponse } from "../types";


export default function HealthPanel() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getHealth();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao chamar a API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <>
      <div className="status-grid">
        <div>
          <span className="label">API Base URL</span>
          <span className="value">{API_BASE_URL}</span>
        </div>
        <div>
          <span className="label">API Status</span>
          <span className="value">{loading ? "Verificando..." : health?.status ?? "indisponivel"}</span>
        </div>
        <div>
          <span className="label">Database</span>
          <span className="value">{loading ? "Verificando..." : health?.database ?? "desconhecido"}</span>
        </div>
      </div>

      {error ? <p className="error">Erro: {error}</p> : null}

      <button type="button" onClick={() => void refresh()} disabled={loading}>
        {loading ? "Atualizando..." : "Atualizar status"}
      </button>
    </>
  );
}