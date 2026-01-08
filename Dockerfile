FROM node:20-alpine

COPY . /app
WORKDIR /app

RUN npm i && npm run build

EXPOSE 8745

ENTRYPOINT [ "npx" ]
CMD ["-y", "http-server", "-p 8745", "dist"]
