FROM node:22-alpine AS builder

WORKDIR /app/back

COPY back/package.json back/package-lock.json ./
RUN npm ci

COPY back/tsconfig.json ./
COPY back/src ./src
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY back/package.json back/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/back/dist ./dist
COPY back/destinations.json back/listings.json ./
COPY front/public/images ./images

ENV DESTINATION_IMAGES_DIR=/app/images

EXPOSE 3000

CMD ["node", "dist/server.js"]
