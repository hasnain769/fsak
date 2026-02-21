# Compliance Checklist

Quick reference for determining compliance requirements based on data handled and target markets.

---

## Decision Tree

```
Does app handle personal data?
├── Yes → GDPR (if EU users) / CCPA (if CA users)
│   └── Is it health data? → HIPAA
│   └── Is it children's data? → COPPA
│   └── Is it payment data? → PCI DSS
└── No → Minimal requirements

Is this for enterprise customers?
├── Yes → SOC 2 Type II likely required
└── Government? → FedRAMP / StateRAMP
```

---

## GDPR (General Data Protection Regulation)

**Applies to**: Any app with EU/EEA users

**Key Requirements**:
- [ ] Privacy policy clearly explaining data use
- [ ] Explicit consent for data collection
- [ ] Right to access personal data (data export)
- [ ] Right to deletion (right to be forgotten)
- [ ] Data breach notification (72 hours)
- [ ] Data Processing Agreement with vendors
- [ ] Privacy by design
- [ ] Data Protection Impact Assessment for high-risk processing

**Technical Implementation**:
- Data export endpoint
- Account deletion endpoint
- Consent management system
- Audit logging
- Encryption at rest and in transit

---

## CCPA (California Consumer Privacy Act)

**Applies to**: Apps with California users AND (>$25M revenue OR >50k users OR 50%+ revenue from data sales)

**Key Requirements**:
- [ ] "Do Not Sell My Personal Information" link
- [ ] Disclose data collection practices
- [ ] Right to know what data is collected
- [ ] Right to delete
- [ ] Right to opt-out of sale
- [ ] No discrimination for exercising rights

---

## SOC 2 Type II

**Applies to**: B2B SaaS, enterprise customers

**Trust Service Criteria**:
- [ ] **Security**: System protected against unauthorized access
- [ ] **Availability**: System available for operation as committed
- [ ] **Processing Integrity**: Processing is complete, accurate, timely
- [ ] **Confidentiality**: Information designated confidential is protected
- [ ] **Privacy**: Personal information handled per privacy notice

**Common Controls**:
- Access control (SSO, MFA)
- Encryption in transit and at rest
- Audit logging
- Incident response plan
- Vendor management
- Employee background checks
- Security awareness training

---

## HIPAA (Health Insurance Portability and Accountability Act)

**Applies to**: Apps handling Protected Health Information (PHI)

**Key Requirements**:
- [ ] Business Associate Agreement (BAA) with cloud provider
- [ ] Access controls and audit trails
- [ ] Encryption at rest and in transit
- [ ] Minimum necessary access
- [ ] Security Risk Assessment
- [ ] Breach notification procedures
- [ ] Employee training

**Technical Requirements**:
- Role-based access control
- Automatic session timeout
- Unique user identification
- Audit logs for PHI access
- Encryption (AES-256)
- Integrity verification

---

## PCI DSS (Payment Card Industry Data Security Standard)

**Applies to**: Apps that store, process, or transmit cardholder data

**12 Requirements Summary**:
1. Firewall configuration
2. No vendor-supplied defaults
3. Protect stored cardholder data
4. Encrypt transmission
5. Antivirus/anti-malware
6. Secure systems and applications
7. Restrict access by business need
8. Unique IDs for access
9. Restrict physical access
10. Track and monitor access
11. Regular security testing
12. Information security policy

**Simplification Strategy**:
- Use payment processor (Stripe, Braintree)
- Never store card numbers
- Use tokenization
- Reduces scope significantly

---

## Quick Compliance Matrix

| Regulation | Who | Penalty | Priority |
|------------|-----|---------|----------|
| GDPR | EU users | Up to €20M or 4% global revenue | Critical |
| CCPA | CA users (thresholds) | $7,500 per intentional violation | High |
| SOC 2 | Enterprise sales | Lost deals | High |
| HIPAA | Health data | Up to $1.5M/year | Critical |
| PCI DSS | Payment data | Fines + lost processing | Critical |

---

## Implementation Priority

1. **Always**: Privacy policy, terms of service
2. **If any user data**: GDPR-like rights (access, delete, export)
3. **If payments**: Use hosted payment provider, never store cards
4. **If enterprise**: Plan for SOC 2 from start
5. **If health**: Get HIPAA-compliant hosting, BAA
