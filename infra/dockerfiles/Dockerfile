ARG NODE_VERSION=22.17.0

FROM node:${NODE_VERSION}-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.9.2 --activate

COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

CMD ["yarn", "dev"]