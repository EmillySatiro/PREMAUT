import { API_BASE_URL } from "../../../shared/config/environment";
import { HealthResponse } from "../types";


export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error(`Falha HTTP ${response.status}`);
  }

  return (await response.json()) as HealthResponse;
}