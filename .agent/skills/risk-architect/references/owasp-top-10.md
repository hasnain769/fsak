# OWASP Top 10 (2021) Quick Reference

Security risks to check against when reviewing application designs.

---

## A01: Broken Access Control

**Risk**: Users acting outside intended permissions.

**Check For**:
- Missing authorization checks on endpoints
- Direct object references (IDOR)
- Bypassing access controls by modifying URLs
- CORS misconfiguration
- Missing function-level access control

**Mitigations**:
- Server-side authorization on every request
- Deny by default
- Disable directory listing
- Log access control failures
- Rate limit API access

---

## A02: Cryptographic Failures

**Risk**: Exposure of sensitive data due to weak/missing encryption.

**Check For**:
- Plaintext data transmission (HTTP vs HTTPS)
- Weak/deprecated algorithms (MD5, SHA1, DES)
- Missing encryption at rest
- Exposed API keys/secrets in code
- Weak key management

**Mitigations**:
- TLS 1.3 for all traffic
- AES-256 for data at rest
- Bcrypt/Argon2 for passwords
- Secrets manager (not env vars in code)
- Classify data by sensitivity

---

## A03: Injection

**Risk**: Untrusted data sent as part of command/query.

**Check For**:
- SQL injection points
- NoSQL injection
- Command injection (OS commands)
- LDAP injection
- XPath injection

**Mitigations**:
- Parameterized queries / prepared statements
- Input validation (allowlist)
- ORMs with proper escaping
- Limited database permissions
- Static analysis for injection patterns

---

## A04: Insecure Design

**Risk**: Missing/ineffective security controls in design.

**Check For**:
- Missing threat modeling
- No security in requirements
- Assumptions about trust boundaries
- Missing rate limiting
- Business logic flaws

**Mitigations**:
- Threat modeling (STRIDE)
- Security user stories
- Reference architectures
- Design patterns library
- Security by design principles

---

## A05: Security Misconfiguration

**Risk**: Insecure default configurations, incomplete setups.

**Check For**:
- Default credentials
- Unnecessary features enabled
- Verbose error messages
- Missing security headers
- Outdated software

**Mitigations**:
- Hardened baseline configs
- Remove unused features
- Automated config scanning
- Security headers (CSP, HSTS)
- Regular patching process

---

## A06: Vulnerable Components

**Risk**: Using components with known vulnerabilities.

**Check For**:
- Outdated dependencies
- Unmaintained libraries
- Known CVEs in dependency tree
- Missing security updates
- No SBOM (Software Bill of Materials)

**Mitigations**:
- Dependency scanning (Dependabot, Snyk)
- Automated updates with testing
- Monitor vulnerability databases
- Remove unused dependencies
- License compliance check

---

## A07: Identification & Authentication Failures

**Risk**: Weaknesses in authentication mechanisms.

**Check For**:
- Weak password policies
- Missing MFA
- Session fixation
- Credential stuffing vulnerability
- Insecure password recovery

**Mitigations**:
- Strong password requirements
- MFA for sensitive operations
- Secure session management
- Rate limiting on auth endpoints
- Account lockout after failures

---

## A08: Software & Data Integrity Failures

**Risk**: Trusting untrusted data/code without verification.

**Check For**:
- Unsigned updates
- Unverified CI/CD pipeline
- Insecure deserialization
- Missing integrity checks
- Tampered dependencies

**Mitigations**:
- Code signing
- Signed and verified updates
- SBOM with integrity verification
- Secure CI/CD pipeline
- Content integrity (SRI)

---

## A09: Security Logging & Monitoring Failures

**Risk**: Unable to detect or respond to breaches.

**Check For**:
- Missing audit logs
- Logs not monitored
- No alerting on suspicious activity
- Insufficient log retention
- Logs exposed or injectable

**Mitigations**:
- Centralized logging
- Audit trails for sensitive actions
- Real-time alerting
- Log integrity protection
- Incident response plan

---

## A10: Server-Side Request Forgery (SSRF)

**Risk**: Server makes requests to unintended destinations.

**Check For**:
- URL parameters fetched by server
- Internal service access from external input
- Cloud metadata endpoint access
- File:// protocol access

**Mitigations**:
- Input validation for URLs
- Allowlist of permitted destinations
- Segment internal networks
- Disable unnecessary URL schemes
- Block metadata endpoints
