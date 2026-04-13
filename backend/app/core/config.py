import os
from dataclasses import dataclass


def _parse_csv(raw_value: str) -> list[str]:
    values = [item.strip() for item in raw_value.split(",") if item.strip()]
    return values or ["*"]


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "PREMAUT")
    app_version: str = os.getenv("APP_VERSION", "1.0.0")
    cors_allow_origins_raw: str = os.getenv("CORS_ALLOW_ORIGINS", "*")

    @property
    def cors_allow_origins(self) -> list[str]:
        return _parse_csv(self.cors_allow_origins_raw)


settings = Settings()