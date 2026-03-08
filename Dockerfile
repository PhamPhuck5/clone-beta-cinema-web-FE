FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# --- production (multi-stage build) ---
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g serve

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]