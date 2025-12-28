# EXE101 Backend

This is a Spring Boot microservices project built with Java 21 and Spring Boot 3.5.9. It's organized as a Maven multi-module setup, which makes it easier to manage shared code and keep services independent.

## Structure

The project is split into several services, each handling a specific part of the system:

- **common** - This one doesn't run on its own (no port). It's where we keep all the shared utilities, base classes, and configurations that the other services use. Think of it as the foundation everything else builds on.

- **authen** (Port 8081) - Our OAuth2 authorization server. This is the single source of truth for authentication - all other services trust tokens from here.

- **read** (Port 8083) - Handles read operations for the system.

- **workflow** (Port 8082) - Manages workflow-related functionality.

- **email** (Port 8084) - Takes care of sending emails.

- **cronjob** (Port 8085) - Runs scheduled tasks and background jobs.

## Getting Started

To build everything at once, run:

```bash
cd app
mvn clean install -DskipTests
```

Once that's done, you can start any service individually. For example, to start the authentication service:

```bash
cd app/authen
mvn spring-boot:run
```

By default, everything runs with the `local` profile. If you need to switch to a different environment, set the `SPRING_PROFILES_ACTIVE` environment variable to `dev` or `stage`.

## Configuration

Each service has its own `application.yaml` file, plus environment-specific overrides:
- `application-local.yaml` - For local development (debug logging, auto DDL updates)
- `application-dev.yaml` - For the dev environment (Flyway migrations enabled)
- `application-stage.yaml` - For staging (production-like settings)

The base configuration lives in `common/src/main/resources/application.yaml`. Each service imports this and then overrides whatever it needs to customize.

## Database Setup

We're using PostgreSQL, and each service has its own database:
- `auth` - For the authentication service
- `read` - For the read service
- `workflow` - For the workflow service
- `email` - For the email service
- `cronjob` - For the cronjob service

Make sure you create these databases before starting the services. When running locally, it connects to `localhost:5432` with default settings. For other environments, you'll need to set the appropriate environment variables.

## Security

We're using OAuth2 with a resource server setup. The `authen` service is the authorization server that issues JWT tokens. All the other services act as resource servers that validate those tokens. The security configuration is centralized in the common module, so services just import it and it works automatically.

## Tech Stack

Here's what we're using:
- Spring Boot 3.5.9
- Java 21
- PostgreSQL for data persistence
- Spring Security OAuth2 for authentication
- JPA/Hibernate for database access
- MapStruct for object mapping
- Lombok to reduce boilerplate
- Redis (optional) for caching
- Flyway for database migrations
- Actuator for monitoring and health checks
- OpenAPI/Swagger for API documentation
- Resilience4j for handling failures gracefully

## A Few Things to Know

Services are configured to scan both their own package and `com.project.exe.common`. This means they automatically pick up all the common beans and configurations without any extra setup.

We follow an interface/implementation pattern: service interfaces go in `service/`, and their implementations live in `service/impl/`.

Configuration classes are named per module to avoid conflicts. For example, you'll see `AuthenDataSourceConfiguration` instead of just `DataSourceConfiguration`. This prevents Spring from getting confused when multiple modules have similar configs.
