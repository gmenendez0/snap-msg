#!/bin/bash

currentDir=$(pwd)
cd "$(dirname "$0")"

echo "INICIA INICIALIZACIÓN ${0}: $(date '+%d/%m/%Y %H:%M:%S')"

# Ejecutar el script para crear la base de datos
echo "Ejecutando create_database.sh..."
./create_database.sh
result=$?

if [ $result -ne 0 ]; then
    echo "ERROR al ejecutar create_database.sh"
    cd "${currentDir}"
    exit $result
fi

# Ejecutar el script para añadir columnas a la base de datos
echo "Ejecutando add_columns_to_database.sh..."
./add_columns_to_database.sh
result=$?

if [ $result -ne 0 ]; then
    echo "ERROR al ejecutar add_columns_to_database.sh"
    cd "${currentDir}"
    exit $result
fi

echo "FINALIZA CORRECTAMENTE INICIALIZACIÓN ${0}: $(date '+%d/%m/%Y %H:%M:%S')"

cd "${currentDir}"

exit 0

