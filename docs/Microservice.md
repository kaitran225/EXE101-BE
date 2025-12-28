# Microservices Architecture

OAuth2-based microservices setup. One auth server, multiple resource servers.

## Services

**authen** (Port 8081)

- OAuth2 authorization server
- Issues JWT tokens
- Only service that doesn't validate tokens

**read** (Port 8083)

- Resource server
- Validates JWT from auth server
- Read operations

**workflow** (Port 8082)

- Resource server
- Workflow management

**email** (Port 8084)

- Resource server
- Email sending service

**cronjob** (Port 8085)

- Resource server
- Scheduled task execution

## Communication

Services communicate via HTTP REST. OAuth2 JWT tokens for authentication. Each service validates tokens independently using the auth server's JWK endpoint.

Feign clients available in common module for service-to-service calls. Circuit breakers and retries configured via Resilience4j.

## Database

Each service has its own PostgreSQL database. No shared database. Services are independent.

## Security Flow

1. Client authenticates with auth server
2. Auth server issues JWT token
3. Client includes token in requests to resource servers
4. Resource servers validate token via JWK endpoint
5. Request proceeds if valid

Security config is centralized in common module. Resource servers just import it.

## Deployment

Services are independent. Deploy separately. Each has its own config, database, and can scale independently. Common module is a dependency, packaged as a JAR and included in each service.
