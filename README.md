# Run private Blockchain

## Install etherum 

https://ethereum.gitbooks.io/frontier-guide/content/installing_linux.html

## Run etherum

./Blockchain/start.sh

# Run frontend (Linux)

npm install -g serve

serve Frontend/

# Run DB in Docker
 
docker run \
  --detach \
  --publish 27017:27017 \
  --restart unless-stopped \
  --name MongoDB \
  --volume /home/manuel/TMP/MIX_CAN_DELETE/hackzurich2017:/data/db \
  mongo:3.4
