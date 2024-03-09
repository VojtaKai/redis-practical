# redis-practical
NodeJS server uses Redis as a cache

# Starting Redis in a Docker container
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
## Access CLI
docker exec -it redis-stack-server redis-cli

# Technologies used
- NodeJS
- Express
- Redis
- Postman