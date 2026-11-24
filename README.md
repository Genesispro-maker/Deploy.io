# Deploy Pipeline

A learning-in-progress deployment tool, built in Go. The goal is a one-page UI that takes a Git URL or an uploaded project, builds it into a container image with Railpack, runs it as a container, and fronts it with Caddy, with build and deploy logs streaming live.

**This repo is a work in progress.** The table below is the honest state of things. Anything not marked "done" or "written" does not exist yet.

## Status

| Piece | State |
|---|---|
| `GET /healthz` | Done |
| `GET /deployments` (hardcoded sample data) | Done, will be replaced by the store |
| In-memory store (`internal/store`): deployments, log lines, status updates | Written, not yet wired into the API or tested |
| Pipeline (`internal/deploy`): clone, `railpack build`, `docker run`, status changes, log capture | Written, **not yet run end to end through the API** |
| Railpack build of a small Go app, done by hand in WSL2 | Done |
| `POST /deployments` that starts the pipeline | Not wired up yet |
| `GET /deployments/{id}` | Not done |
| Live log streaming (SSE) | **Not done** |
| Caddy routing and live URLs | Not done |
| Frontend (Vite + TanStack Router + Query) | Not started |
| Persistence (SQLite or Postgres) | Not done, store is in memory only |
| Zip / folder uploads | Designed, not written |
| `docker compose up` for the whole stack | **Not done** |
| Tests | Not done |

## Running what exists today

There is no `docker compose up` yet. The pieces run manually.

Prerequisites (developed on Windows with WSL2):

- Go 1.25 (version in `go.mod`)
- Docker Desktop with WSL integration enabled
- Railpack installed inside WSL (Linux binary)
- A BuildKit container, started by hand:

```bash
docker run --rm --privileged -d --name buildkit moby/buildkit
export BUILDKIT_HOST='docker-container://buildkit'
```

`--privileged` gives that container broad access inside Docker's VM. Stop it when you are not building: `docker stop buildkit`.

Run the API from the repo root:

```bash
git clone https://github.com/Genesispro-maker/Deploy.io.git
cd Deploy.io
go run ./internal
```

Then, from a second terminal:

```bash
curl http://localhost:8080/healthz
```

(The entry point currently lives in `internal/main.go`. It will move to `cmd/server/`.)

## Layout

```
internal/
├── api/      HTTP handlers and server setup
├── store/    models, Store interface, in-memory implementation
└── deploy/   the pipeline (git clone, railpack build, docker run)
```

Dependencies point one way: `api` and `deploy` import `store`, and `store` imports nothing from this repo.

## Design (what the pieces are meant to do)

### Store

Handlers and the pipeline talk to a `Store` interface, not to a slice or a database directly. Today the implementation is a mutex-protected in-memory slice and map. Swapping in SQLite or Postgres later should mean one new file and one changed line in `main`.

### Pipeline

Each deployment runs in its own goroutine so `POST /deployments` can return immediately:

```
pending -> building (clone, railpack build) -> deploying (docker run) -> running
                                  any step failing -> failed (with the error)
```

Every line of command output is saved with a per-deployment sequence number. Commands are run with `os/exec`, arguments passed separately (never through a shell), with a timeout.

### Live logs (planned)

Lines are stored first, then broadcast to connected SSE clients. A client that connects late replays stored lines (`LogsSince`), then switches to live ones. This is meant to cover both "stream while building" and "scroll back afterwards". The store half exists; the broadcaster and the SSE endpoint do not.

### Routing (planned)

Caddy as the single ingress, with routes added and removed through its admin API as containers start and stop. Path-based (`/apps/<id>`) first, because it needs no DNS setup.

## Known gaps and shortcuts

- "running" currently means `docker run -d` returned, not that the app is healthy.
- Deployed containers are published on a random localhost port for testing, until Caddy exists.
- A server restart loses all state and leaves any in-flight deployment stuck.
- Git URL validation is minimal (`https://` prefix only).
- Old containers and images are not cleaned up.

## Next steps, in order

1. Run one real deployment through the API from a public Git URL and fix whatever breaks.
2. Learn goroutines, channels and `context` properly, then add the log broadcaster and the SSE endpoint.
3. Add the persistent store (SQLite preferred: no extra service to run).
4. Add Caddy routing.
5. Write `docker-compose.yml` (API, BuildKit, Caddy, frontend) and test it from a fresh clone.
6. Zip upload support.
7. A few meaningful tests (store log replay, status transitions).

## Things I would change in a real version

- Docker socket access for the API container (needed to start containers) is effectively root on the host. A real version would use a restricted runner or a proper orchestrator.
- Hostname-based routing instead of paths.
