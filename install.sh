sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
sudo add-apt-repository 'deb [arch=amd64] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse'
sudo apt-get update -y
sudo apt-get install -y mongodb-org
sudo apt-get install -y nodejs
sudo apt-get install -y npm
cd backend
npm install
cd ..