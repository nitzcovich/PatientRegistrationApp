## PostgreSQL setup
```bash
docker pull postgres:latest
docker run --name my-sql -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres
```

## BACKEND SETUP

```bash
docker build -t backend .
docker run -it -p 3000:3000 -e POSTGRES_DB_URL=postgresql://myuser:mypassword@host.docker.internal:5432/mydatabase -e PORT=3000 backend
```