FROM node:8.12

ENV GOOGLE_CLIENT_ID=""
ENV GOOGLE_CLIENT_SECRET=""
ENV GOOGLE_REDIRECT_URL=""
ENV DATABASE_URL=""
ENV FORCE_HTTPS=false
ENV DISABLE_FRAME_GUARD=false

RUN mkdir /roombelt

WORKDIR /roombelt

COPY package.json package-lock.json index.js LICENSE.txt README.md ./
COPY backend backend/
COPY frontend frontend/

RUN npm install && \
    npm run build:frontend && \
    npm prune --production

EXPOSE 3000

ENV NODE_ENV=production
CMD [ "npm", "start" ]
