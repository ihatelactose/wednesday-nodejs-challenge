FROM node:16-alpine
RUN mkdir -p /app
ADD . /app
WORKDIR /app
RUN apk update && apk add git
RUN yarn

CMD ["sh", "./migrate-and-run.sh"]
EXPOSE 9000