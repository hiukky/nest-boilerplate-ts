FROM node:12.13-alpine As development

RUN mkdir /nest
ADD . /nest

WORKDIR /nest
COPY package*.json ./
RUN yarn --only=development
COPY . .
RUN yarn build

FROM node:12.13-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /nest
COPY package*.json ./
RUN yarn --only=production
COPY . .


RUN npm i -g @nestjs/cli
RUN npm i -g typeorm

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY --from=development /nest/dist ./dist

CMD ["node", "dist/main"]