FROM ubuntu:18.04

RUN mkdir /home/work

WORKDIR /home/work

RUN apt update -y && apt install -y sudo && apt install -y vim && apt install -y curl && apt install -y git

RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

RUN apt install -y nodejs

RUN git clone https://github.com/arvincsh/zMEC_text_client_v2.git

WORKDIR /home/work/zMEC_text_client_v2

RUN npm install

CMD [ "node", "/home/work/zMEC_text_client_v2/app.js" ]

