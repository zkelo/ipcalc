FROM node:20-alpine

COPY . /app
WORKDIR /app

RUN npm i && npm run build

ENTRYPOINT [ "npx" ]
CMD ["-y", "http-server", "dist"]
