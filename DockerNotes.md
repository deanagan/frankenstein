# Docker Notes


## Docker build
docker build --pull -t seed-collection .

## Docker run
docker run -p 8081:8081 -d --name seed-collection seed-collection


## Using postman, we can access the API at 8081

# Docker stop
docker stop seed-collection

# Docker check container in use
docker ps -a

# Docker remove container
docker rm [CONTAINER ID]

# Docker commit
docker commit -m "Add comment here" -a "[full name]" seed-collection [docker hub username]/seed-collection:latest

# Docker login and push committed image
docker login
docker push [docker hub username]/seed-collection:latest
