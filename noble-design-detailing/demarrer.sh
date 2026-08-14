#!/usr/bin/env bash
# ============================================================================
#  Noble Design Detailing — lancement du site en local (macOS / Linux)
#
#  Usage :  ./demarrer.sh          (port 8080 par défaut)
#           ./demarrer.sh 3000     (autre port)
#
#  Le site est 100 % statique : aucune installation, aucune dépendance.
#  Ce script démarre juste un petit serveur web local et ouvre le navigateur.
#  Pour arrêter le serveur : Ctrl + C
# ============================================================================

set -e

PORT="${1:-8080}"
DOSSIER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DOSSIER"

echo ""
echo "  Noble Design Detailing — serveur local"
echo "  ---------------------------------------"
echo "  Dossier : $DOSSIER"
echo "  Adresse : http://localhost:$PORT"
echo "  Arrêter : Ctrl + C"
echo ""

# Ouvre le navigateur une fois le serveur prêt (en tâche de fond).
ouvrir_navigateur() {
  sleep 1
  if command -v open >/dev/null 2>&1; then
    open "http://localhost:$PORT"            # macOS
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:$PORT"        # Linux
  fi
}
ouvrir_navigateur &

# On utilise le premier outil disponible sur la machine.
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  exec python -m http.server "$PORT"
elif command -v npx >/dev/null 2>&1; then
  exec npx --yes serve . --listen "$PORT"
elif command -v php >/dev/null 2>&1; then
  exec php -S "localhost:$PORT"
else
  echo "  Aucun serveur local trouvé (python3, npx ou php)."
  echo "  Solution la plus simple : ouvrez directement le fichier index.html"
  echo "  dans votre navigateur — tout fonctionne, sauf les URL sans .html."
  exit 1
fi
