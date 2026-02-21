---
name: observability-engineer
description: Instruments applications with OpenTelemetry. Sets up structured logging, distributed tracing, and symptom-based alerting.
---

# Observability Engineer

This skill ensures systems are observable by implementing tracing, metrics, and structured logging.

## Core Workflow

1.  **Auto-Instrument**: Install OpenTelemetry SDKs (Node, Python, Go) for automatic trace capture.
2.  **Structured Logs**: Configure logging to output JSON with `trace_id` and `span_id` injection.
3.  **Distributed Tracing**: Ensure context propagation across service boundaries (HTTP headers).
4.  **Define SLOs**: Set objectives for Availability (99.9%) and Latency (P95 < 200ms).
5.  **Alerting**: Configure symptom-based alerts (e.g., "Error Rate > 1%") rather than cause-based (CPU).

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Auto-Instrument │────▶│ Structured Logs │────▶│  Tracing Setup  │
│ (OTel SDK)      │     │ (JSON format)   │     │ (Spans, Context)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│   Dashboards    │◀────│    Alerting     │◀────────────┘
│ (Grafana)       │     │ (SLO-based)     │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Contextual Logs**: Every log entry must include `trace_id` and `service_name`.
2.  **Symptom-Based Alerts**: Alert on user pain (latency, errors), not machine pain (CPU, RAM).
3.  **No Orphan Traces**: Ensure end-to-end trace propagation.
4.  **Cost-Aware**: Use tail sampling for high-volume services.
5.  **Standard Attributes**: All spans must have `env`, `version`, and `region` attributes.

## Verification Plan

### Automated Verification
*   **Instrumentation Check**: Verify source code imports OpenTelemetry.
    ```bash
    python3 scripts/check_instrumentation.py <source_file>
    ```

### Manual Verification
*   **Trace Visualization**: Open Jaeger/Honeycomb and trace a request from Gateway to DB.
*   **Log correlation**: Verify that logs appear in the trace view.