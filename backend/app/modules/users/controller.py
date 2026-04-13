from fastapi import Depends

from app.modules.users.schemas import UserSummary
from app.modules.users.service import UserService, get_user_service


class UserController:
    def __init__(self, service: UserService):
        self.service = service

    def list_users(self, limit: int) -> list[UserSummary]:
        return self.service.list_users(limit=limit)


def get_user_controller(service: UserService = Depends(get_user_service)) -> UserController:
    return UserController(service=service)