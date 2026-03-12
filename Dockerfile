FROM node:20-alpine AS build
WORKDIR /app

COPY . /app

RUN npm i && npm run build

EXPOSE 8745

ENTRYPOINT [ "npx" ]
CMD ["-y", "http-server", "-p 8745", "."]
