FROM node:9.8

RUN mkdir -p /opt/vod

COPY package*.json install.sh /tmp/

RUN cd /tmp && /bin/bash install.sh
RUN cp -a /tmp/node_modules /opt/vod

WORKDIR /opt/vod
COPY . .

EXPOSE 3000

CMD [ "/bin/bash", "start.sh" ]
