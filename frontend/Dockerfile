# ---------- Build Stage ----------
FROM node:18 AS builder

WORKDIR /app
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM node:18-slim

WORKDIR /app

# Install lightweight static file server
RUN npm install -g serve

# Copy built app from previous stage
COPY --from=builder /app/dist .

# Start the static server
CMD ["serve", "-s", ".", "-l", "3000"]