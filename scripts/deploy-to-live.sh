#!/usr/bin/env bash
set -euo pipefail

# Builds portfoliov2 (mobile-nav-layout) and publishes to harryyang.ca via the
# harryyangzy/portfolio Netlify deploy repo.
#
# Usage (from repo root, with push access to harryyangzy/portfolio):
#   ./scripts/deploy-to-live.sh

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_REPO="${DEPLOY_REPO:-$ROOT/../portfolio}"
BRANCH="${DEPLOY_BRANCH:-main}"

cd "$ROOT"
npm run build

if [[ ! -d "$DEPLOY_REPO/.git" ]]; then
  echo "Cloning deploy repo to $DEPLOY_REPO ..."
  git clone "https://github.com/harryyangzy/portfolio.git" "$DEPLOY_REPO"
fi

cd "$DEPLOY_REPO"
git checkout "$BRANCH"
git pull origin "$BRANCH"

find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -a "$ROOT/dist/." .

git add -A
if git diff --cached --quiet; then
  echo "No changes to deploy."
  exit 0
fi

git commit -m "Deploy latest dist build."
git push origin "$BRANCH"
echo "Pushed to portfolio/$BRANCH — Netlify will publish harryyang.ca shortly."
