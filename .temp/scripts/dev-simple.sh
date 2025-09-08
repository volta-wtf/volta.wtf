#!/bin/bash

# Script simplificado para desarrollo con dominios locales
# Ejecutar con: ./scripts/dev-simple.sh

echo "Iniciando proyectos con dominios locales..."

# Función para iniciar un proyecto
start_project() {
    local project=$1
    local port=$2

    echo "Iniciando $project en puerto $port"

    # Cambiar al directorio del proyecto y iniciar en background
    cd "apps/$project" 2>/dev/null || cd "sites/$project" 2>/dev/null

    if [ -f "package.json" ]; then
        # Iniciar el proyecto en el puerto especificado
        pnpm run dev --port $port &

        # Volver al directorio raíz
        cd ../..
    else
        echo "No se encontró package.json en $project"
    fi
}

# Iniciar proyectos en puertos específicos
start_project "catalog" "3003"
start_project "admin" "3001"
start_project "builder" "3002"
start_project "editor" "3004"
start_project "docs" "3005"
start_project "www" "3000"
start_project "articles" "3010"
start_project "globals" "3020"
start_project "styles" "3030"
start_project "theme" "3040"
start_project "knowledge" "3050"

echo ""
echo "Proyectos iniciados!"
echo "Accede a tus proyectos en:"
echo "   http://catalog.local:3003"
echo "   http://admin.local:3001"
echo "   http://builder.local:3002"
echo "   http://editor.local:3004"
echo "   http://docs.local:3005"
echo "   http://www.local:3000"
echo "   http://articles.local:3010"
echo "   http://globals.local:3020"
echo "   http://styles.local:3030"
echo "   http://theme.local:3040"
echo "   http://knowledge.local:3050"

echo ""
echo "Para configurar dominios sin puertos:"
echo "1. Instalar nginx: brew install nginx"
echo "2. Copiar configuración: sudo cp nginx-volta.conf /usr/local/etc/nginx/servers/"
echo "3. Iniciar nginx: sudo brew services start nginx"
echo "4. Luego podrás acceder a: http://catalog.local (sin puerto)"

echo ""
echo "Para detener todos los procesos:"
echo "   pkill -f 'next dev'"
