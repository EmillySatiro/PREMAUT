const rawApiBaseUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();

export const API_BASE_URL = (rawApiBaseUrl || "http://localhost:8000").replace(/\/$/, "");