FROM node:14-alpine as api
WORKDIR /app
COPY package.json ./
RUN npm install --silent
COPY . .
RUN npm run build

CMD [ "node", "dist/main" ]
