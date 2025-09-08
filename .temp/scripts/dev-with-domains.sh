#!/bin/bash

# Script para iniciar todos los proyectos con dominios locales
# Ejecutar con: ./scripts/dev-with-domains.sh

echo "Iniciando todos los proyectos con dominios locales..."

# Función para iniciar un proyecto
start_project() {
    local project=$1
    local domain=$2
    local port=$3

    echo "Iniciando $project en http://$domain:$port"

    # Cambiar al directorio del proyecto y iniciar en background
    cd "apps/$project" 2>/dev/null || cd "sites/$project" 2>/dev/null

    if [ -f "package.json" ]; then
        # Actualizar el script dev para usar el dominio
        sed -i.bak "s/next dev --turbopack --port [0-9]*/next dev --turbopack --hostname $domain --port $port/" package.json

        # Iniciar el proyecto
        pnpm run dev &

        # Volver al directorio raíz
        cd ../..
    else
        echo "No se encontró package.json en $project"
    fi
}

# Lista de proyectos con sus dominios y puertos
start_project "catalog" "catalog.local" "80"
start_project "admin" "admin.local" "80"
start_project "builder" "builder.local" "80"
start_project "editor" "editor.local" "80"
start_project "docs" "docs.local" "80"
start_project "www" "www.local" "80"
start_project "articles" "articles.local" "80"
start_project "globals" "globals.local" "80"
start_project "styles" "styles.local" "80"
start_project "theme" "theme.local" "80"
start_project "knowledge" "knowledge.local" "80"

echo ""
echo "Todos los proyectos iniciados!"
echo "Accede a tus proyectos en:"
echo "   http://catalog.local"
echo "   http://admin.local"
echo "   http://builder.local"
echo "   http://editor.local"
echo "   http://docs.local"
echo "   http://www.local"
echo "   http://articles.local"
echo "   http://globals.local"
echo "   http://styles.local"
echo "   http://theme.local"
echo "   http://knowledge.local"

echo ""
echo "Para detener todos los procesos:"
echo "   pkill -f 'next dev'"
