# Usa imagem oficial do PostgreSQL
FROM postgres:16

# Define variáveis de ambiente para usuário, senha e banco inicial
ENV POSTGRES_DB=premaut
ENV POSTGRES_USER=premaut_admin
ENV POSTGRES_PASSWORD=senha_supersegura

# Copia o schema para dentro do container (ajuste o caminho se necessário)
COPY PREMAUT/SQL/*.sql /docker-entrypoint-initdb.d/

# O PostgreSQL executa automaticamente qualquer .sql em /docker-entrypoint-initdb.d/ ao iniciar o container