#! /bin/bash

directory=$PWD'/GenesisNode/volume/'
bootnodeKey=$(cat $PWD/Bootnode/boot.key)
bootnodeURL='enode://'$bootnodeKey'@127.0.0.1:3300'

rm -rf $directory'/*':

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
  --rpc \
  --rpcaddr '127.0.0.1' \
  --rpcport 8545 \
  --rpcapi 'eth,net,web3,personal' \
  --rpccorsdomain '*' \
  --ws \
  --wsaddr '127.0.0.1' \
  --wsport 8546 \
  --wsapi 'eth,net,web3,personal' \
  --wsorigins '*' \
  --gasprice 1 \
  --txpool.pricelimit 1 \
  --txpool.pricebump 1 \
  --txpool.accountslots 1024;
