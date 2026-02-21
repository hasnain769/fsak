---
name: iac-provisioner
description: Manages cloud infrastructure using Terraform or Pulumi. Sets up environments (Dev/Staging/Prod) and handles state management.
---

# IaC Provisioner

This skill manages cloud infrastructure through code, handling provisioning, state management, and environment isolation.

## Core Workflow

1.  **Initialize**: Configure the backend (S3/GCS) for remote state storage.
2.  **Declare Resources**: Translate `ARCHITECTURE.md` into Terraform/Pulumi code sections (Network, Compute, DB).
3.  **Plan**: Run `terraform plan` to preview changes and validate configuration.
4.  **Apply**: Execute `terraform apply` after user confirmation to provision resources.
5.  **Export**: Output connection strings and endpoints to `docs/DEPLOYMENT_INFO.md`.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ State Init      │────▶│ Resource Declare│────▶│     Plan        │
│ (Remote Backend)│     │ (From ARCH.md)  │     │ (Preview)       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│ Export Outputs  │◀────│     Apply       │◀────────────┘
│(DEPLOYMENT.md)  │     │(User Confirmed) │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Immutable**: No manual console changes. All infra updates must go through code.
2.  **Isolated State**: Use separate state files/backends for dev, staging, and prod.
3.  **Version Control**: All IaC code must be committed to git.
4.  **Safety**: Always review the PLAN before applying.
5.  **Environment Parity**: Dev/Staging should resemble Prod structure (scaled down).

## Verification Plan

### Automated Verification
*   **Env Check**: Verify Terraform installation.
    ```bash
    python3 scripts/check_terraform.py
    ```
*   **Lint**: Run `terraform fmt -check` (if available).

### Manual Verification
*   **Plan Review**: Manually inspect `terraform plan` output for unintended destructions.
*   **Console Check**: Verify key resources (e.g., VPC ID) match output in AWS Console.