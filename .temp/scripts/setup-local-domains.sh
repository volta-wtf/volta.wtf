#!/bin/bash

# Script para configurar dominios locales para el monorepo
# Ejecutar con: ./scripts/setup-local-domains.sh

echo "Configurando dominios locales para el monorepo..."

# Lista de proyectos y sus dominios
declare -A projects=(
    ["catalog"]="catalog.local"
    ["admin"]="admin.local"
    ["builder"]="builder.local"
    ["editor"]="editor.local"
    ["docs"]="docs.local"
    ["www"]="www.local"
    ["articles"]="articles.local"
    ["globals"]="globals.local"
    ["styles"]="styles.local"
    ["theme"]="theme.local"
    ["knowledge"]="knowledge.local"
)

# Lista de puertos para cada proyecto
declare -A ports=(
    ["catalog"]="80"
    ["admin"]="80"
    ["builder"]="80"
    ["editor"]="80"
    ["docs"]="80"
    ["www"]="80"
    ["articles"]="80"
    ["globals"]="80"
    ["styles"]="80"
    ["theme"]="80"
    ["knowledge"]="80"
)

# Crear backup del archivo hosts
sudo cp /etc/hosts /etc/hosts.backup

# Agregar dominios al archivo hosts
echo "" | sudo tee -a /etc/hosts
echo "# Dominios locales para volta.wtf monorepo" | sudo tee -a /etc/hosts

for project in "${!projects[@]}"; do
    domain="${projects[$project]}"
    echo "127.0.0.1 $domain" | sudo tee -a /etc/hosts
    echo "✅ Configurado: $domain"
done

echo ""
echo "Dominios locales configurados exitosamente!"
echo "Puedes acceder a tus proyectos en:"
for project in "${!projects[@]}"; do
    domain="${projects[$project]}"
    echo "   http://$domain"
done

echo ""
echo "Para revertir los cambios:"
echo "    sudo cp /etc/hosts.backup /etc/hosts"
