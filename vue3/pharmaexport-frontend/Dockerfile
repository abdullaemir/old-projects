FROM node:lts-bullseye as build
ARG authToken
ARG buildMode

WORKDIR /app

RUN echo registry=https://npm.phz.team/ >> /root/.npmrc
RUN echo //npm.phz.team/:_authToken=$authToken >> /root/.npmrc

COPY package*.json ./

RUN npm pkg delete scripts.prepare
RUN npm ci

COPY . .

RUN npx vite-ssr build --mode $buildMode

EXPOSE 8080

CMD [ "npm", "run", "start" ]

FROM build as build-test

FROM build as build-production

RUN npx @sentry/cli releases set-commits $(npx @sentry/cli releases propose-version) --auto --ignore-missing
RUN npx @sentry/cli releases files $(npx @sentry/cli releases propose-version) \
  upload-sourcemaps ./dist/client/assets ./dist/server --url-prefix "~/assets"
RUN npx rimraf ./dist/**/*.js.map
