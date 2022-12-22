FROM node:14-alpine as angular
LABEL Author="sauloramosjunior@hotmail.com"
WORKDIR /app/ui
COPY . .
RUN npm install --silent
RUN npm run build
RUN npm install --global http-server
ENTRYPOINT npm run start-prod
EXPOSE 8080

