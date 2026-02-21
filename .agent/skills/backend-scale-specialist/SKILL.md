---
name: backend-scale-specialist
description: Optimizes database performance, implements caching strategies (Redis), and manages background job queues.
---

# Backend Scale Specialist

This skill optimizes backend systems for scale, focusing on database performance, caching, and asynchronous processing.

## Core Workflow

1.  **Analyze Bottlenecks**: Identify slow queries, high latency endpoints, or resource constraints.
2.  **Design Schema**: Create normalized schemas (3NF) but denormalize for read-heavy loads if needed.
3.  **Optimize Queries**: Ensure every `WHERE` clause has an index. Detect and fix N+1 query problems.
4.  **Implement Caching**: Apply Cache-Aside pattern for general reads. Use Redis with appropriate TTLs.
5.  **Offload Work**: Move heavy tasks (email, image processing) to background queues (BullMQ, Celery).
6.  **Verify**: Run load tests and audit schema for best practices.

## Engineering Standards

1.  **Index Every Lookup**: No full table scans allowed on production paths.
2.  **Connection Pooling**: Always use connection pools (e.g., `psycopg_pool`) with limits.
3.  **Async First**: Any operation taking > 200ms must be backgrounded.
4.  **Cache TTLs**: Explicitly set TTL for all cache keys to prevent stale data.
5.  **Performance Targets**:
    *   Query P95: < 50ms
    *   Cache Hit Ratio: > 80%

## Verification Plan

### Automated Verification
*   **Audit Schema**: Run the schema auditor to check for missing primary keys.
    ```bash
    python3 scripts/audit_schema.py docs/schema.sql
    ```

### Manual Verification
*   **Explain Plan**: Run `EXPLAIN ANALYZE` on critical queries to verify index usage.
*   **Load Test**: Simulate 2x expected traffic to verify connection pool stability.