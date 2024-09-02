#!/bin/bash

currentDir=`pwd`
cd `dirname $0`

echo "INICIA DEPLOY ${0}: `date '+%d/%m/%Y %H:%M:%S'`"

# Variables
binary='/usr/bin/psql'              #Path al ejecutable mysql
sqlScript='add_columns_to_database.sql'     #Script SQL a ejecutar
username='postgres'                 #username
password=''                         #password (SI SE USA CONTRASEÑA, SE DEBE MODIFICAR LA LINEA DONDE SE EJECUTA EL COMANDO PARA QUE LA TOME!)
dbName="snapMsg"

#Ejecucion del comando
$binary -U ${username} < ${sqlScript}
result=$?

#Chequeo del resultado de ejecucion
if [ ${result} -eq 0 ]
then
    echo "OK al ejecutar sentencias, archivo input: "${sqlScript}
else
    echo "ERROR al ejecutar sentencias, archivo input: "${sqlScript}
    cd ${currentDir}
    exit ${result}
fi

echo "FINALIZA CORRECTAMENTE DEPLOY ${0}: `date '+%d/%m/%Y %H:%M:%S'`"

cd ${currentDir}

exit 0
