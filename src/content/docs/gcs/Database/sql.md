---
title: SQL
description: Documentation of SQL decisions
---

## Docker Database Connection
The PostGreSQL database is hosted on a Docker image. 
The docker compose file lists the PostGreSQL password, user, and initial database. 
By default, PostGreSQL is hosted on port 5432 but has a port forwarded to 5433. 
This means that accessing PostGreSQL is done on 5433: localhost:5433


## Technical Database Connection
To be compatible with the TauRPC setup in the Rust State Manager, a db variable holds the instance of the PostGreSQL database connection. 
It's initialized in the new() function as a connection pool.
Connection pooling minimizes the amount of computing power needed to create a new connection to the database every time by reusing existing connections as they're needed.
The connection pool is initialized as 5 connections.
See [this article](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing) on reading up on initializing number of connections for a database pool.

## Using Database Connection
The SQL connection variable initialized has to be copied over when performing a SQL query within the `sql.rs` file. 
The clone() function in Rust creates a shallow copy and recommended to be used when passing over the connection variable.
A shallow copy references the variable's address, allowing the previously-initialized value of the connection pool to be "copied" over and reused without initializing another connection pool. 


### Notes on Database Init Query
The Select query combines the SQL tables to form a JSON structure because SQL doesn't traditionally support JSON.
The contents have been 'vibe-coded' and works because it works.



