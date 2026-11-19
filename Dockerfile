FROM ghcr.io/pnpm/pnpm:12
RUN apt-get update && apt-get install wget unzip ca-certificates -y --no-install-recommends
RUN pnpm runtime set node lts -g


WORKDIR /srv
COPY . .
RUN pnpm i
RUN pnpm build

CMD ["pnpm", "start"]