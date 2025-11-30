# --- Build stage ---
FROM node:20-alpine AS builder

# Installer PNPM via corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copier uniquement les fichiers de dépendances pour optimiser le cache
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances en utilisant un cache persistant
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copier le reste du code
COPY . .

# Construire l'application
RUN pnpm run build

# --- Production stage ---
FROM nginx:1.27-alpine AS runner

# Copier la config nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
