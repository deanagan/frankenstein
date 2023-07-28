# Docker Notes


## Docker build
docker build --pull -t card-collection .

## Docker run
docker run -p 8081:8081 -d --name card-collection card-collection


## Using postman, we can access the API at 8081

# Docker stop
docker stop card-collection

# Docker check container in use
docker ps -a

# Docker remove container
docker rm [CONTAINER ID]

# Docker commit
docker commit -m "Add comment here" -a "[full name]" card-collection [docker hub username]/card-collection:latest

# Docker login and push committed image
docker login
docker push [docker hub username]/card-collection:latest
