# Project Structure

Maven multi-module setup. Parent POM manages all modules and shared dependencies.

## Module Layout

```
app/
├── common/          Shared code, base classes, utilities
├── authen/          OAuth2 authorization server
├── read/            Read service
├── workflow/         Workflow service
├── email/           Email service
└── cronjob/         Scheduled jobs service
```

## Common Module

Holds everything services share:
- Base entities and repositories
- Service interfaces and base implementations
- Security configurations
- Data source and JPA configs
- Caching, resilience, observability setup
- Validation utilities
- Exception handlers
- DTOs and mappers

Services depend on common, import its configs, and override what they need.

## Service Modules

Each service is a Spring Boot app with:
- `Application.java` - Main class, scans own package + common
- `config/` - Module-specific configs that import common
- `service/` - Business logic interfaces
- `service/impl/` - Implementations
- `controller/` - REST endpoints
- `entity/` - JPA entities
- `repository/` - Data access
- `dto/` - Data transfer objects

## Configuration Pattern

Common base config in `common/src/main/resources/application.yaml`. Each service has:
- `application.yaml` - Base config, imports common
- `application-local.yaml` - Local dev overrides
- `application-dev.yaml` - Dev environment
- `application-stage.yaml` - Staging environment

## Package Structure

Standard package layout per module:
- `com.project.exe.{module}` - Module-specific code
- `com.project.exe.common` - Shared code (imported)

Services scan both packages so they pick up common beans automatically.



