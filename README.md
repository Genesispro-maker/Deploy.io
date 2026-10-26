# Deploy Pipeline

A one-page deployment tool. Submit a Git URL or an uploaded project, and it is built into a container image with Railpack, run as a container, and exposed through Caddy. Build and deploy logs stream to the UI live.

## Quick start

Prerequisites: Docker with Compose v2. Nothing else, and no external accounts.

```bash
git clone https://github.com/Genesispro-maker/Deploy.io.git
cd Deploy.io
docker compose up --build
```

Then open http://localhost.

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | API listen port |
| `DATA_DIR` | `/data` | SQLite file and build workspaces |
| `DOCKER_NETWORK` | `deploy-net` | Network shared by Caddy and deployed containers |
| `CADDY_ADMIN_URL` | `http://caddy:2019` | Caddy admin API |

All have defaults, so none need to be set.

A sample app to deploy lives in `sample-app/`. Use its path or a public Git URL.

## Architecture

```
Browser ──> Caddy (single ingress)
              ├── /            -> frontend (Vite + TanStack)
              ├── /api         -> api (Go)
              └── /apps/<id>   -> deployed container
```

- **frontend**: one page. TanStack Query for lists and status, an `EventSource` for logs.
- **api** (Go): REST for deployments, SSE for logs, SQLite for state.
- **pipeline** (inside the api): clone, `railpack build`, `docker run`, register route in Caddy.
- **caddy**: the only published port. Routes are added and removed through its admin API as deployments start and stop.

### Deployment lifecycle

`pending -> building -> deploying -> running`, or `failed` from any step.

### API

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/deployments` | Create from a Git URL or uploaded archive |
| `GET` | `/api/deployments` | List with status, image tag, live URL |
| `GET` | `/api/deployments/{id}` | One deployment |
| `GET` | `/api/deployments/{id}/logs` | SSE stream: stored lines first, then live |

### Live logs

Each log line is written to SQLite first, then broadcast to connected SSE clients. A client that connects late (or after the build ends) replays stored lines and then switches to live ones. One mechanism covers "visible while building" and "persists for scroll-back".

## Decisions

- **Go for the backend.** Subprocess handling and concurrent streaming are what it is good at. Pure-Go SQLite driver, so no CGO in the build.
- **SQLite.** One file, no extra service, enough for this scope.
- **Caddy admin API instead of rewriting a Caddyfile.** Routes change without restarts.
- **Path-based routing (`/apps/<id>`).** Works on localhost with no DNS setup. Hostname routing would be the production choice.
- **Railpack only, no handwritten Dockerfiles** for deployed apps.

## With more time

- Rollback and redeploy of a previous image tag
- Build cache reuse across deploys
- Graceful shutdown and zero-downtime swaps (start new, health check, switch route, stop old)
- Per-deployment resource limits and log retention
- A few integration tests around the status state machine and log replay

## What I would rip out

- Docker socket access from the API container. It is convenient but gives the API full control of the host's Docker. A production version would use a dedicated, restricted runner.
- Path-based routing, in favor of per-deployment hostnames.
