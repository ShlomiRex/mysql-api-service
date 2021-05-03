# Build
docker build -t mysql_api_server .

# Run persistant storage - for production no need for volumes
docker run -v ./server:/usr/src/app/server -d --name mysql_api_worker -p 8081:80 --env-file=.env mysql_api_server

# Execute shell
docker container exec -it mysql-api-worker /bin/sh