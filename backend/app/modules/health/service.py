from app.core.database import get_database_status
from app.modules.health.schemas import HealthResponse


class HealthService:
    def get_health(self) -> HealthResponse:
        return HealthResponse(status="ok", database=get_database_status())