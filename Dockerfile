# docker build --platform linux/amd64 -t allisof/weexa-web .

FROM node:alpine as dependencies

WORKDIR /app

COPY package.json ./

RUN yarn install

FROM node:alpine as build

WORKDIR /app

COPY ./ ./
COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn next telemetry disable
RUN yarn build

FROM node:alpine as runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY .env.local ./

EXPOSE 3000

CMD ["yarn", "start"]