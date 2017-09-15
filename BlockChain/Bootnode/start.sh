#! /bin/bash

# bootnode --genkey=$PWD/boot.key;

bootnodeKey=$(cat $PWD/Bootnode/boot.key)

docker rm -f Bootnode; \
docker run \
  --detach \
  --restart unless-stopped \
  --name Bootnode \
  --network host \
hackzurich/charity:1.0 \
  bootnode \
  --nodekeyhex=$bootnodeKey \
  --addr='0.0.0.0:3300' \
  --verbosity 9;