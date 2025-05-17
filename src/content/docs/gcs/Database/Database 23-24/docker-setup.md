---
title: Docker Setup
description: Docker container used to host the Redis and RabbitMQ servers 
---

## Instructions
1. Create a `.env` file in the main gcs-database-api folder if it doesn't already exist using the format provided in `.env.sample`

```
USER_NAME="sample-user-name"
PASSWD="sample-password"`
```

2. Enter the following line into the console: `docker-compose up --detach`
3. Run `dotnet run` in console
4. Open Redis Commander and log in with the credentials set in the `.env` file

## Next Step: [Python Virtual Environment Setup](../python-env)