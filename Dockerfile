FROM dhi.io/node:20-alpine3.23

COPY . /app
WORKDIR /app

RUN npm i && npm run build

EXPOSE 8745

ENTRYPOINT [ "npx" ]
CMD ["-y", "http-server", "-p 8745", "dist"]
