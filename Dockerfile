FROM node:12.13-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn --only=development
COPY . .
RUN yarn build

FROM node:12.13-alpine As production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn --only=production
COPY . .

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN npm i -g @nestjs/cli
RUN npm i -g typeorm

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]