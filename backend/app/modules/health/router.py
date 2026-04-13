from fastapi import APIRouter, Depends

from app.modules.health.controller import HealthController, get_health_controller
from app.modules.health.schemas import HealthResponse


router = APIRouter()


@router.get("", response_model=HealthResponse)
def read_health(controller: HealthController = Depends(get_health_controller)) -> HealthResponse:
    return controller.get_health()