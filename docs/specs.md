# Technical Specification (SPEC): FSAK Logistics Marketing Site

## 1. Product Overview (MoSCoW)
**Goal**: Build a bilingual (English & Arabic) marketing website for FSAK Logistics to establish online presence, showcase services/projects, and generate leads via quote requests.

### Must Have (MVP)
- Bilingual Support (LTR and RTL seamlessly).
- Mobile-First Responsive Design.
- Core Pages (Home, About, 6 Services, Projects, Contact).
- Lead generation contact form.
- Branding alignment (Blue #004785, Orange #FF8C00, Dark Grey #222222).

## 2. User Stories
- As a potential client, I want to view the site in Arabic or English so I can easily understand the services in my preferred language.
- As a logistics partner, I want to see FSAK's fleet and past case studies to evaluate their capabilities.
- As a business owner, I want to quickly request a quote for Heavy Transport or Customs Clearance.

## 3. Functional Requirements
- **Language Switcher**: Users can toggle between English and Arabic. The layout direction MUST change from LTR to RTL accordingly.
- **Top Navigation**: Mobile-responsive hamburger menu with links to all major pages.
- **Contact Form**: An interactive form capturing Name, Phone, Email, Service Selection, and Message. Must include client-side validation.
- **Service Catalog**: A grid/carousel displaying the 6 primary services with dedicated detail views.
- **Case Studies / Projects Hub**: A gallery section showcasing fleet operations and successful projects.

## 4. Non-Functional Requirements
- **Performance**: High Core Web Vitals score (>90 Desktop, >85 Mobile). Images (trucks/inventory) optimized.
- **Reliability**: Hosted on Hostinger with 99.9% uptime target. Static export preferred for stability if Node.js is unsupported.

### 4.4 Accessibility
- ARIA labels on all interactive elements. Semantic HTML structure with proper `<h1>` to `<h6>` hierarchy. High contrast matching WCAG 2.1 AA.

### 4.5 Observability
- Integration with basic web analytics (e.g., Google Analytics). Console error logging in development and form submission failure telemetry.

## 5. Data Model
For MVP content will be managed locally.
```json
// Service Model
{
  "id": "string",
  "title": {"en": "string", "ar": "string"},
  "description": {"en": "string", "ar": "string"},
  "image": "string"
}
```

## 6. API Requirements
- `POST /api/contact`: Form submission endpoint (if Node.js is supported). Accepts JSON with user details, returns 200 OK or 400 Bad Request if validation fails.

## 7. Proposed Tech Stack
- **Framework**: Next.js (App Router).
- **Styling**: Tailwind CSS (Mobile-First).
- **Language**: TypeScript.
- **i18n**: `next-intl`.

## 8. Security & Compliance
- **Form Security**: Basic Honeypot field and input sanitization to prevent XSS.
- **Transport**: HTTPS enforcement across all routes.
- **Data Use**: No sensitive client data stored on-site; contact requests sent directly via email.

## 9. Edge Cases & Error Handling
- **Translation Missing**: Fallbacks to English if an Arabic translation key is omitted.
- **Network Failure on Submit**: Display a user-friendly error message ("Failed to send request. Please try contacting us via phone.") if the `POST /api/contact` fails.

## 10. Risks & Mitigations
- **Risk**: Hostinger shared hosting may not fully support Next.js SSR.
  - **Mitigation**: Architecture defaults to Static Site Generation (`output: 'export'`) ensuring compatibility via static HTML/JS fallback.

## 11. Glossary
- **LTR/RTL**: Left-to-Right / Right-to-Left writing direction.
- **i18n**: Internationalization.
