#!/bin/bash

# Variables
DB_NAME="snapMsg"
DB_USER="postgres"

# Verificar si la base de datos ya existe
DB_EXISTS=$(psql -U $DB_USER -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")

if [ "$DB_EXISTS" == "1" ]; then
    echo "La base de datos '$DB_NAME' ya existe. No se realizará ninguna acción."
else
    # Crear la base de datos si no existe
    echo "Creando la base de datos '$DB_NAME'..."
    psql -U $DB_USER -c "CREATE DATABASE \"$DB_NAME\";"

    # Verificar si la base de datos fue creada exitosamente
    if [ $? -eq 0 ]; then
        echo "Base de datos '$DB_NAME' creada exitosamente."
    else
        echo "Hubo un error al crear la base de datos '$DB_NAME'."
    fi
fi
