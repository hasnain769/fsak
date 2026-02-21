---
name: api-spec-designer
description: Designs and validates API contracts (OpenAPI, GraphQL, gRPC). Ensures the "Source of Truth" for service communication. Use when ARCHITECTURE.md is finalized, when defining endpoints, or when asked to "design the API", "create swagger doc", "define endpoints", "create API contract". Triggers on "API spec", "OpenAPI", "endpoints", "REST API", "GraphQL schema".
---

# API Spec Designer

This skill designs and validates API contracts to ensure a single source of truth for service communication.

## Core Workflow

1.  **Map Resources**: Analyze `docs/SPEC.md` and `docs/ARCHITECTURE.md` to identify resources, actions, and relationships.
2.  **Define Schema**: For each endpoint, define HTTP method, path, request/response shapes, and auth requirements.
3.  **Generate Spec**: Create the spec file based on the chosen style (REST -> `docs/api-spec.yaml`, GraphQL -> `docs/schema.graphql`, gRPC -> `docs/*.proto`).
4.  **Generate Mocks**: Add example responses for every endpoint in the spec.
5.  **Validate**: Run `scripts/validate_oas.py` to ensure the spec is compliant.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Resource Mapping│────▶│ Schema Definition│────▶│ Spec Generation │
│ (from SPEC.md)  │     │ (Request/Response)│     │ (OpenAPI/GraphQL)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│   Validation    │◀────│ Mock Generation │◀────────────┘
│ (validate_oas.py)│     │ (Example responses)│
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Contract as Law**: Implementation must not deviate from the spec.
2.  **Versioning**: All APIs must be versioned (e.g., `/api/v1/`).
3.  **Idempotency**: Design PUT/DELETE operations to be idempotent.
4.  **Consistency**: Use consistent naming and patterns (see below).
5.  **Documentation**: Every endpoint must have a description and examples.

### Naming Conventions
*   **Resource paths**: `/users`, `/orders` (plural nouns).
*   **Nested resources**: `/users/{id}/orders`.
*   **Actions**: `POST /orders/{id}/cancel` (verb at the end for actions).
*   **Query params**: `?status=active` (filtering), `?limit=10` (pagination).

## Verification Plan

### Automated Verification
*   **Validate Spec**: Run the validation script to check for syntax and best practices.
    ```bash
    python3 scripts/validate_oas.py docs/api-spec.yaml
    ```

### Manual Verification
*   **Review**: Ensure all resources from `SPEC.md` are covered.
*   **Mock Check**: Verify that every 200 OK response has a realistic example.