FROM node:8.12

ENV NODE_ENV=production

ENV GOOGLE_CLIENT_ID=""
ENV GOOGLE_CLIENT_SECRET=""
ENV GOOGLE_REDIRECT_URL=""
ENV DATABASE_URL=""
ENV FORCE_HTTPS=false

RUN mkdir /roombelt

WORKDIR /roombelt

COPY package.json package-lock.json index.js LICENSE.txt README.md ./
COPY backend backend/
COPY frontend frontend/

RUN npm i --only=dev && \
    npm i --only=prod && \
    npm run build:frontend && \
    npm prune --production

EXPOSE 3000

CMD [ "npm", "start" ]
