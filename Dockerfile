FROM node:24-slim

RUN mkdir -p /usr/local/building-app
COPY . /usr/local/building-app
WORKDIR /usr/local/building-app

RUN npm ci
RUN npm run build

RUN cp -r /usr/local/building-app/dist /usr/local/app
WORKDIR /usr/local/app
RUN rm -rf /usr/local/building-app
CMD ["node", "repl.js"]
