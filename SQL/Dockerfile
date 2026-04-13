FROM postgres:16

# Mantem a ordem de execucao dos scripts de inicializacao.
COPY SQL/01_tabelas.sql /docker-entrypoint-initdb.d/01_tabelas.sql
COPY SQL/02_indexs.sql /docker-entrypoint-initdb.d/02_indexs.sql
COPY SQL/03_trigger.sql /docker-entrypoint-initdb.d/03_trigger.sql
COPY SQL/04_views.sql /docker-entrypoint-initdb.d/04_views.sql