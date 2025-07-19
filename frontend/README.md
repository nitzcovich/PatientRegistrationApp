## FRONTEND SETUP

```bash
docker build --build-arg VITE_API_BASE_URL="http://localhost:3000" -t frontend .
docker run -it -p 5173:3000 frontend
```
