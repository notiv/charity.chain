# docker build -t hackzurich/charity:1.0 .

FROM ubuntu:16.04
MAINTAINER klemen.kozelj@gmail.com

RUN apt-get update; apt-get -y upgrade;

RUN apt-get install -y software-properties-common;
RUN add-apt-repository -y ppa:ethereum/ethereum;
RUN add-apt-repository -y ppa:ethereum/ethereum-dev;
RUN apt-get update;
RUN apt-get install -y ethereum;

RUN mkdir -p /home/ubuntu/ethereum;

VOLUME /home/ubuntu/ethereum;

COPY GenesisData/ /home/ubuntu/ethereum/
