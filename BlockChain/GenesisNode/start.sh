#! /bin/bash

directory=$PWD'/GenesisNode/volume/'
bootnodeKey=$(cat $PWD/Bootnode/connect.key)
bootnodeURL='enode://'$bootnodeKey'@127.0.0.1:3300'

rm -rf $directory'/*':

<<COMMENT
docker rm -f GenesisNode; \
docker run \
  --detach \
  --restart unless-stopped \
  --name GenesisNode \
  --network host \
  --volume $directory:/home/ubuntu/ethereum/ipc \
hackzurich/charity:1.0 \
  geth \
    --identity=GenesisNode \
    --datadir=/home/ubuntu/ethereum/ \
    --ipcpath=/home/ubuntu/ethereum/ipc/geth.ipc \
    --bootnodes=$bootnodeURL \
    --maxpeers 2 \
    --verbosity 9 \
    --rpc \
    --rpcaddr '127.0.0.1' \
    --rpcport 8545 \
    --rpcapi 'eth,net,web3,personal' \
    --rpccorsdomain '*' \
    --gasprice 1 \
    --txpool.pricelimit 1 \
    --txpool.pricebump 1 \
    --txpool.accountslots 1024;
COMMENT

# This is bypass
cp -R $PWD/GenesisData/* $PWD/GenesisNode/volume/;
rm -rf /Users/$USER/.ethash

geth \
  --identity=GenesisNode \
  --datadir=$directory \
  --ipcpath=$directory/ipc/geth.ipc \
  --bootnodes=$bootnodeURL \
  --maxpeers 2 \
  --rpc \
  --rpcaddr '127.0.0.1' \
  --rpcport 8545 \
  --rpcapi 'eth,net,web3,personal' \
  --rpccorsdomain '*' \
  --gasprice 1 \
  --mine \
  --minerthreads 1 \
  --etherbase '0x7ed536956731bf9267d5dcb5edda732233490ed5' \
  --txpool.pricelimit 1 \
  --txpool.pricebump 1 \
  --txpool.accountslots 1024;
