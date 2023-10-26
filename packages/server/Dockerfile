FROM node:20.5-slim as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN mkdir -p /opt/node_app && chown -R node:node /opt/node_app
WORKDIR /opt/node_app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src

FROM base AS prod-deps
WORKDIR /opt/node_app

RUN pnpm install --prod --frozen-lockfile

FROM base AS build
WORKDIR /opt/node_app

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base

COPY --from=prod-deps /opt/node_app/node_modules ./node_modules
COPY --from=build /opt/node_app/dist ./dist

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

ARG VERSION
ARG PORT=3000

ENV PORT $PORT
ENV PATH /opt/node_app/node_modules/.bin:$PATH
ENV VERSION=${VERSION:-unknown}
ENV NODE_ENV=production
ENV NODE_OPTIONS="--enable-source-maps"

EXPOSE $PORT
CMD [ "pnpm", "run", "start:prod"]
