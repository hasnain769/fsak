---
name: risk-architect
description: Identifies security vulnerabilities, infrastructure bottlenecks, and cost overruns before development. Performs automated threat modeling. Use when PRD/SPEC/ARCHITECTURE is generated, when proposing cloud providers, or when asked to "audit security", "check risks", "estimate costs", "threat model". Triggers on security, compliance, risk assessment, cost optimization.
---

# Risk Architect

This skill proactively identifies and mitigates security, infrastructure, and cost risks.

## Core Workflow

1.  **Threat Modeling**: Use STRIDE methodology to analyze `docs/SPEC.md` and `docs/ARCHITECTURE.md`.
2.  **Infra Analysis**: Identify Single Points of Failure (SPOF) and bottleneck components.
3.  **Compliance Check**: Verify adherence to GDPR, SOC2, or HIPAA based on data sensitivity.
4.  **Cost Estimation**: Run the cost estimator to project monthly cloud spend.
5.  **Report**: Generate `docs/RISK_ASSESSMENT.md` with prioritized findings.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Threat Modeling │────▶│   Infra Analysis │────▶│ Cost Estimation │
│ (OWASP, STRIDE) │     │ (SPOF, scaling)  │     │ (Monthly TCO)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│   Output Report │◀────│ Compliance Check│◀────────────┘
│(RISK_ASSESSMENT)│     │ (GDPR, SOC2)    │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Zero Trust**: Assume network perimeters are breached. Authenticate every internal request.
2.  **Least Privilege**: Components should only have permissions necessary for their function.
3.  **Fail Secure**: Systems must default to a secure state upon failure.
4.  **Privacy First**: Minimize PII collection and retention.
5.  **Defense in Depth**: Implement multiple layers of security controls.

### Risk Severity Matrix
*   **Critical**: Immediate danger to business continuity or data (e.g., public S3 bucket).
*   **High**: Significant impact, likely to happen (e.g., unencrypted internal traffic).
*   **Medium**: Moderate impact or unlikely high impact.
*   **Low**: Minor improvements.

## Verification Plan

### Automated Verification
*   **Cost Estimate**: Run the estimator script.
    ```bash
    python3 scripts/cost_estimator.py docs/ARCHITECTURE.md
    ```

### Manual Verification
*   **STRIDE Check**: Verify every component in the architecture has been analyzed for Spoofing, Tampering, etc.
*   **Compliance Audit**: Manually cross-check data storage against legal requirements.