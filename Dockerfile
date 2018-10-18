FROM node:8.12

RUN mkdir /app

ADD https://github.com/ziolko/roombelt/archive/master.tar.gz /app/roombelt.tar.gz


RUN tar zxvf /app/roombelt.tar.gz -C /app

COPY roombelt.env /app/roombelt-master

WORKDIR /app/roombelt-master

RUN npm i
RUN npm run build:frontend


EXPOSE 3000

CMD [ "npm", "start" ]
