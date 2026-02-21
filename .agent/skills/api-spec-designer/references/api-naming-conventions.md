# API Naming Conventions

Standards for consistent, RESTful API design.

---

## URL Structure

### Base Format
```
https://api.example.com/v{version}/{resource}
```

### Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Use nouns, not verbs | `/users` | `/getUsers` |
| Plural resource names | `/orders` | `/order` |
| Lowercase with hyphens | `/user-profiles` | `/userProfiles`, `/user_profiles` |
| No trailing slashes | `/users` | `/users/` |
| Version in path | `/v1/users` | `/users?version=1` |

---

## HTTP Methods

| Method | Purpose | Idempotent | Request Body |
|--------|---------|------------|--------------|
| GET | Retrieve resource(s) | Yes | No |
| POST | Create resource | No | Yes |
| PUT | Replace resource | Yes | Yes |
| PATCH | Partial update | Yes | Yes |
| DELETE | Remove resource | Yes | No |

---

## Resource Patterns

### CRUD Operations
```
GET    /users           # List all users
POST   /users           # Create user
GET    /users/{id}      # Get single user
PUT    /users/{id}      # Replace user
PATCH  /users/{id}      # Update user
DELETE /users/{id}      # Delete user
```

### Nested Resources
```
GET    /users/{id}/orders           # User's orders
POST   /users/{id}/orders           # Create order for user
GET    /users/{id}/orders/{orderId} # Specific order
```

### Actions (Non-CRUD)
```
POST   /orders/{id}/cancel          # Cancel order
POST   /users/{id}/verify-email     # Trigger verification
POST   /auth/login                  # Authentication
POST   /auth/logout                 # Logout
```

---

## Query Parameters

### Filtering
```
GET /users?status=active
GET /users?role=admin&status=active
GET /orders?created_after=2024-01-01
```

### Pagination
```
GET /users?page=2&limit=20
GET /users?cursor=abc123&limit=20  # Cursor-based (preferred)
```

### Sorting
```
GET /users?sort=created_at         # Ascending
GET /users?sort=-created_at        # Descending (prefix -)
GET /users?sort=name,-created_at   # Multiple fields
```

### Field Selection
```
GET /users?fields=id,name,email
```

### Search
```
GET /users?q=john
GET /products?search=laptop
```

---

## Response Structure

### Success Response
```json
{
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### List Response
```json
{
  "data": [ ... ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

### Error Response (RFC 7807)
```json
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "Email format is invalid",
  "instance": "/users/123",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

---

## Status Codes

| Code | Use Case |
|------|----------|
| 200 | Success (GET, PUT, PATCH) |
| 201 | Created (POST) |
| 204 | No Content (DELETE) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (not authorized) |
| 404 | Not Found |
| 409 | Conflict (duplicate, race condition) |
| 422 | Unprocessable Entity (semantic error) |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

---

## Headers

### Request Headers
```
Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json
X-Request-ID: <uuid>
```

### Response Headers
```
X-Request-ID: <uuid>
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```
