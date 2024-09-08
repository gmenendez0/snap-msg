# snap-msg

## Requisitos:

1. Docker & DockerCompose

## Env Vars:

1. **PORT**: Puerto en el que se levantara la aplicacion.
2. **LOG_ROUTE**: Ruta donde se guardara el log de la aplicacion.
3. **LOGGING**: true o false, si se quiere que la aplicacion logee.
4. **DB_DATABASE**: Se espera que sea "snapMsg".
5. **DB_USERNAME**: Usuario de la base de datos.
6. **DB_PASSWORD**: Contraseña del usuario de la base de datos.
7. **DB_HOST**: Host de la base de datos.
8. **DB_PORT**: Puerto de la base de datos.
9. **DB_SYNCHRONIZE**: true o false, si se quiere que la aplicacion sincronice la base de datos.
10. **DB_LOGGING**: true o false, si se quiere que la aplicacion logee las queries de la base de datos.
11. **DB_TYPE**: Tipo de base de datos, se espera que sea "postgres".
12. **MIGRATIONS_PATH**: Ruta donde se guardaran las migraciones de la base de datos.
13. **TEST_MATCH**: Ruta donde se guardaran los tests.

# Instrucciones de uso:

1. Clonar el repositorio.
2. Configurar el archivo .env dentro de snap-msg/app siguiendo el ejemplo del archivo .envTemplate. Se recomienda unicamente cambiar los campos MIGRATIONS_PATH y TEST_MATCH.
3. Para levantar la aplicacion y la base de datos, correr `docker-compose up --build` desde el directorio /snap-msg.
4. En caso de que falle la inicializacion del servicio, esto se debe a que el servicio se levanta primero que la base de datos, entonces falla al intentar conectarse.
5. Para solucionar esto, se debera correr `docker-compose up --build` nuevamente (no se como solucionarlo, lo investigo para el TPG).