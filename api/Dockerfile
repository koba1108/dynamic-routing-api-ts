FROM node:18.13.0-alpine3.17 as builder
WORKDIR /app

ARG GQL_HOST
ENV GQL_HOST ${GQL_HOST}

COPY --chown=node:node . .
RUN yarn install && yarn build

FROM node:18.13.0-alpine3.17
RUN apk add --no-cache tini

COPY --from=builder /app/.output .

USER node
ENTRYPOINT [ "/sbin/tini", "--" ]
CMD ["node", "server/index.mjs"]
