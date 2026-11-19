FROM ghcr.io/pnpm/pnpm:12.21.0
RUN pnpm runtime set node 26 -g

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY . .
RUN pnpm build

CMD ["pnpm", "start"]