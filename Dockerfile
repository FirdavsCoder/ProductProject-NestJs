FROM node:lts-alpine3.19

ENV POSTGRES_HOST_AUTH_METHOD trust
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start:prod" ]