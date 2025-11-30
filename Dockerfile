# apps/front/Dockerfile
FROM node:20-alpine AS builder

ARG APP_NAME=espace-admin
ARG NODE_ENV=production

# Installer pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copier les fichiers de configuration pnpm workspace
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml* ./

# Copier le package.json de l'app et des packages
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/package.json

# Copier tous les package.json des packages (si existants)
COPY packages ./packages

# Modifier la variable d'environnement dans le package config
RUN sed -i "s|const environment = \".*\" as|const environment = \"${NODE_ENV}\" as|g" packages/config/src/config.ts

# Installer les dépendances avec cache
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Copier le code source de l'app
COPY apps/${APP_NAME} ./apps/${APP_NAME}

# Builder l'app
WORKDIR /app/apps/${APP_NAME}
RUN pnpm run build

# Stage de production avec Nginx
FROM nginx:1.27-alpine AS runner

ARG APP_NAME=espace-admin
ARG NODE_ENV=production

# Copier la config Nginx
COPY apps/${APP_NAME}/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés
COPY --from=builder /app/apps/${APP_NAME}/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]