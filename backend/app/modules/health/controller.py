from app.modules.health.schemas import HealthResponse
from app.modules.health.service import HealthService


class HealthController:
    def __init__(self, service: HealthService):
        self.service = service

    def get_health(self) -> HealthResponse:
        return self.service.get_health()


def get_health_controller() -> HealthController:
    return HealthController(service=HealthService())