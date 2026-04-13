from fastapi import APIRouter, Depends, Query

from app.modules.users.controller import UserController, get_user_controller
from app.modules.users.schemas import UserSummary


router = APIRouter()


@router.get("", response_model=list[UserSummary])
def list_users(
    limit: int = Query(default=20, ge=1, le=100),
    controller: UserController = Depends(get_user_controller),
) -> list[UserSummary]:
    return controller.list_users(limit=limit)