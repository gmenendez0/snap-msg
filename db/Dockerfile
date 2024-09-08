FROM postgres:14

ENV POSTGRES_DB=snapMsg
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=1234

# Copia el script SQL para inicializar la base de datos en el contenedor
COPY init.sql /docker-entrypoint-initdb.d/

# Exponer el puerto 5432 para PostgreSQL
EXPOSE 5432