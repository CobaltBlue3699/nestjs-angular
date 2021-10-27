FROM node:14.16.1-alpine as development

RUN mkdir /opt/app

WORKDIR /opt/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.16.1-alpine as production

ENV NODE_ENV=production

COPY --from=development /opt/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main" "--prod"]