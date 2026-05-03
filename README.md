# System Zarządzania Finansami i Zadaniami

Wielowarstwowa aplikacja webowa do zarządzania zadaniami, rozliczeniami finansowymi, logami oraz obliczania kosztów paliwa. Projekt składa się z backendu REST API, frontendu SPA oraz bazy danych PostgreSQL.

---

## Stack technologiczny

**Backend** — Python, FastAPI, SQLAlchemy ORM, PostgreSQL, JWT (python-jose), bcrypt (passlib), Pydantic, Uvicorn

**Frontend** — Vue 3, TypeScript, Pinia, Vue Router, Tailwind CSS, PrimeVue 4, Chart.js, vue-i18n, Vite

**Infrastruktura** — Docker, Docker Compose, Docker Swarm, Traefik (reverse proxy, HTTPS), GitHub Actions (CI/CD), Doppler (zarządzanie sekretami)

---

## Struktura projektu

```
/
├── backend/                  REST API (FastAPI)
│   ├── api/                  routing HTTP (5 modułów)
│   ├── core/                 logika biznesowa (handler, middleware, repository)
│   ├── database/             modele ORM, połączenie z bazą, migracje SQL
│   ├── tests/                testy jednostkowe pytest (~68 testów)
│   └── dockerfiles/          Dockerfile local i prod
├── frontend/                 SPA (Vue 3)
│   ├── src/pages/            5 stron aplikacji
│   ├── src/stores/           Pinia stores
│   ├── src/router/           routing + guard autoryzacji
│   └── dockerfiles/          Dockerfile local i prod
├── docker-compose.yaml       uruchomienie lokalne (oba serwisy)
└── makefile                  skróty do docker compose
```

---

## Moduły aplikacji

| Moduł | Backend | Frontend |
|---|---|---|
| Logowanie (JWT) | `api/auth/` | `LoginPanel.vue` |
| Zadania (CRUD + statystyki) | `api/tasks/` | `Tasks.vue` |
| Rozliczenia finansowe (CRUD) | `api/outstanding_money/` | `MoneySettlement.vue` |
| Kalkulator paliwa | `api/fuel_calculator/` | `FuelCalculator.vue` |
| Logi zdarzeń | `api/logs/` | `Logs.vue` |

---

## Uruchomienie lokalne

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Swagger UI: http://localhost:3000/docs

Wymagana baza PostgreSQL dostępna lokalnie. Dane połączenia konfigurowane przez `backend/env/local.env`.

Migracje bazy danych:
```bash
cd backend && bash scripts/db_migration_up.sh
```

---

## Architektura backendu

Każdy moduł zorganizowany warstwowo:

```
api (router) → handler (logika) → repository (zapytania SQL) → database (ORM)
```

Autoryzacja przez middleware JWT (`JWTBasicAuthenticationMiddleware`) — każdy chroniony endpoint wymaga nagłówka `Authorization: Bearer <token>`. Walidacja danych przez Pydantic.

---

## CI/CD i deploy produkcyjny

Projekt skonfigurowany pod automatyczny deploy na serwer VPS przez GitHub Actions.

**Backend pipeline** (`push → main`):
1. Build obrazu Docker → push do DockerHub
2. SSH na serwer → pobranie sekretów z Doppler
3. Deploy przez Docker Swarm (`docker stack deploy`)

**Frontend pipeline** (`push → main`):
1. Instalacja zależności npm, cache
2. Testy Cypress E2E (headless)
3. Build obrazu Docker → push do DockerHub
4. SSH na serwer → deploy przez Docker Swarm

**Docker Swarm (produkcja):**
- Backend: 2 repliki, restart `on-failure`
- Frontend: 1 replika, serwowany przez nginx
- Traefik jako reverse proxy: HTTPS (Let's Encrypt), health check co 10s, retry 3x
- Sekrety produkcyjne zarządzane przez Doppler (nie przechowywane w repo)

Produkcja dostępna pod:
- Frontend: `praca.strona.arturscibor.pl`
- Backend API: `praca.server.arturscibor.pl`

---

## Testy

```bash
# Backend (pytest) — z katalogu backend/
pip install -r requirements.txt
pytest -s -v

# Frontend (Cypress) — z katalogu frontend/
npx cypress run
```

~68 testów jednostkowych pytest (helpers, middleware, repository) — wszystkie PASS.