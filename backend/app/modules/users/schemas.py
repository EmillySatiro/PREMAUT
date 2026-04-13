from pydantic import BaseModel


class UserSummary(BaseModel):
    id: int
    nome: str
    email: str
    tipo: str
    ativo: bool