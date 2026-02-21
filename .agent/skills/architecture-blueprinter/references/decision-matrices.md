# Architecture Decision Matrices

Quick reference guides for common architecture decisions. Use with project context from SPEC.md.

---

## Database Selection

### SQL vs NoSQL vs Graph

| Factor | SQL (PostgreSQL) | Document (MongoDB) | Graph (Neo4j) |
|--------|------------------|-------------------|---------------|
| **Best for** | Structured data, ACID | Flexible schema, rapid iteration | Relationship-heavy data |
| **Schema** | Rigid, migrations | Flexible, schemaless | Nodes + Edges |
| **Scaling** | Vertical + Read replicas | Horizontal sharding | Specialized |
| **Transactions** | Strong ACID | Limited | ACID on subgraph |
| **Query** | SQL (powerful joins) | JSON queries | Cypher |

**Decision Flow:**
```
Need strong consistency? → SQL
Rapidly changing schema? → Document DB  
Data is primarily relationships? → Graph DB
Need full-text search? → Consider Elasticsearch alongside
```

**Recommended Providers:**
- SQL: PostgreSQL (Supabase, Neon, RDS)
- Document: MongoDB Atlas, Firestore
- Graph: Neo4j Aura

---

## API Style Selection

### REST vs GraphQL vs gRPC

| Factor | REST | GraphQL | gRPC |
|--------|------|---------|------|
| **Best for** | Simple CRUD, public APIs | Complex data, mobile apps | Internal microservices |
| **Pros** | Simple, cacheable, universal | Flexible queries, no over-fetch | Fast, typed, streaming |
| **Cons** | Over/under-fetching | Complex caching, N+1 problem | Not browser-native |
| **Tooling** | Mature | Growing | Excellent for services |

**Decision Flow:**
```
Public API for third parties? → REST
Mobile app with complex data needs? → GraphQL
Internal service-to-service? → gRPC
Real-time bidirectional? → WebSockets or gRPC streams
```

---

## Hosting Strategy

### Serverless vs Containers vs VMs

| Factor | Serverless | Containers (K8s) | VMs |
|--------|------------|------------------|-----|
| **Best for** | Bursty traffic, MVPs | Steady traffic, control | Legacy, compliance |
| **Scaling** | Automatic, instant | Auto-scale policies | Manual/slower |
| **Cost model** | Pay per invocation | Pay for running pods | Pay for instance |
| **Cold start** | Yes (can be issue) | No | No |
| **Complexity** | Low | High | Medium |

**Decision Flow:**
```
MVP with unknown traffic? → Serverless
Need persistent connections? → Containers
Require specific OS/hardware? → VMs
Cost-sensitive steady load? → Containers
```

**Recommended Providers:**
- Serverless: Vercel, AWS Lambda, Cloudflare Workers
- Containers: Fly.io, Railway, AWS ECS, GKE
- VMs: EC2, GCE, DigitalOcean Droplets

---

## Frontend Framework

| Factor | Next.js | Remix | Vite + React | SvelteKit |
|--------|---------|-------|--------------|-----------|
| **Best for** | Full-stack, SEO | Forms, data loading | SPA, simple | Performance |
| **SSR** | ✅ Excellent | ✅ Excellent | ❌ SPA only | ✅ Good |
| **Learning curve** | Medium | Medium | Low | Low-Medium |
| **Ecosystem** | Massive | Growing | Massive | Smaller |

**Decision Flow:**
```
Need SEO + Full-stack? → Next.js
Data-heavy forms? → Remix
Simple SPA, no SSR? → Vite + React
Max performance priority? → SvelteKit
```

---

## Authentication

| Factor | Clerk | Auth0 | Supabase Auth | Custom |
|--------|-------|-------|---------------|--------|
| **Best for** | Quick setup, great UX | Enterprise, compliance | Already using Supabase | Full control |
| **Pricing** | Free tier + per MAU | Free tier + per MAU | Free with Supabase | Dev time |
| **Features** | SSO, MFA, webhooks | Everything | Basic + Row Level Security | Depends |
| **Complexity** | Low | Medium | Low | High |

**Decision Flow:**
```
Need enterprise SSO/SAML? → Auth0
Using Supabase for DB? → Supabase Auth
Want beautiful pre-built components? → Clerk
Very custom requirements? → Build custom with library (lucia-auth)
```

---

## Message Queue Selection

| Factor | Redis Pub/Sub | BullMQ | RabbitMQ | Kafka |
|--------|---------------|--------|----------|-------|
| **Best for** | Simple, ephemeral | Job queues | Complex routing | Event streaming |
| **Persistence** | Optional | Redis-backed | Yes | Yes |
| **Scale** | Medium | Medium | High | Very High |
| **Complexity** | Low | Low | Medium | High |

**Decision Flow:**
```
Simple background jobs? → BullMQ
Need complex routing/exchanges? → RabbitMQ
Event sourcing/streaming? → Kafka
Real-time notifications? → Redis Pub/Sub
```
