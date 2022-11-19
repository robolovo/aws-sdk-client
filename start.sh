#!/bin/bash

project_root=$PWD
cd $project_root/infra

docker-compose up -d 

docker exec -it $(docker ps -l -q) mysql -u root -proot aws -e "SELECT 1" > /dev/null

if [ $? -eq 0 ]; then
    echo "MySQL server is ready."
else
    while [ $? -ne 0 ]
    do
        echo "Wating for mysql... (it takes about 30s.)"
        sleep 5
        docker exec -it $(docker ps -l -q) mysql -u root -proot aws -e "SELECT 1" > /dev/null
    done
    echo "MySQL server is ready."
fi

cd $project_root
npm start