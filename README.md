# PREMAUT
O sistema proposto tem como objetivo informatizar a gestão do projeto, permitindo organizar os dados dos alunos, centralizar relatórios e facilitar a comunicação entre monitores, professores e familiares. 

## Stack
- Front-end: React + TypeScript (Vite)
- Back-end: FastAPI (Python)
- Banco de dados: PostgreSQL

## Estrutura criada
- `frontend/`: aplicacao React + TypeScript
- `backend/`: API FastAPI
- `SQL/`: scripts SQL e Dockerfile do PostgreSQL
- `docker-compose.dev.yml`: ambiente de desenvolvimento com hot reload
- `docker-compose.prod.yml`: ambiente de producao

## Arquitetura recomendada

### Backend (modular por dominio)
Cada modulo fica isolado, com suas camadas dentro da propria pasta.

```text
backend/app/
	core/
		config.py
		database.py
	modules/
		health/
			router.py
			controller.py
			service.py
			schemas.py
		users/
			router.py
			controller.py
			service.py
			repository.py
			schemas.py
	main.py
```

### Frontend (escalavel por features)

```text
frontend/src/
	app/
		App.tsx
		app.css
	features/
		health/
			api/
			components/
			types.ts
	shared/
		config/
	main.tsx
```

## Desenvolvimento (hot reload sem rebuild)
Requisitos:
- Docker + Docker Compose

Subir ambiente dev:
```bash
docker compose -f docker-compose.dev.yml up --build
```

Endpoints e interfaces:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Swagger: http://localhost:8000/docs
- PostgreSQL: localhost:5432

No modo dev:
- Alteracoes em `frontend/` refletem no Vite automaticamente.
- Alteracoes em `backend/` refletem no Uvicorn com `--reload`.

Parar ambiente dev:
```bash
docker compose -f docker-compose.dev.yml down
```

Resetar banco dev (remove volume e reaplica SQL na proxima subida):
```bash
docker compose -f docker-compose.dev.yml down -v
```

## Producao
1. Copie o arquivo de exemplo de ambiente:
```bash
cp .env.prod.example .env.prod
```

No PowerShell, voce tambem pode usar:
```powershell
Copy-Item .env.prod.example .env.prod
```

2. Ajuste as variaveis no `.env.prod` (principalmente senha do banco).

3. Suba o ambiente de producao:
```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

No modo prod:
- Frontend servido por Nginx na porta 80.
- Backend executa com Gunicorn + Uvicorn workers.
- Banco sem porta publicada externamente por padrao (acesso interno da rede Docker).

Parar ambiente prod:
```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod down
```

## Atalhos via Makefile
```bash
make dev-up
make dev-down
make dev-logs
make prod-up
make prod-down
make prod-logs
make db-reset
```
