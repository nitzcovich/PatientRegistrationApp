## Light - IT  
### FullStack Challenge

**Development of a Patient Registration App**

- The app is divided into two main folders: `backend` and `frontend`.
- Each of these folders has a README file with instructions to build and run the Docker image.

#### Considerations:
- The email service is pending.

## PostgreSQL setup
```bash
docker pull postgres:latest
docker run --name my-sql -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres
```

## Backend Setup

Run the following commands from the project root:

```bash
cd backend/
docker build -t backend .
docker run -it -p 3000:3000 -e POSTGRES_DB_URL=postgresql://myuser:mypassword@host.docker.internal:5432/mydatabase -e PORT=3000 backend
```

## Frontend Setup

Run the following commands from the project root:

```bash
cd frontend/
docker build --build-arg VITE_API_BASE_URL="http://localhost:3000" -t frontend .
docker run -it -p 5173:3000 frontend
```