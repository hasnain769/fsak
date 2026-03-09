import Hero from '@/components/Hero';
import ClientsSection from '@/components/ClientsSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LogisticsService",
      "name": "FSAK Logistics",
      "image": "https://www.fsaklogistics.com/logo.png",
      "@id": "https://www.fsaklogistics.com",
      "url": "https://www.fsaklogistics.com",
      "telephone": "+966000000000",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "An Nasr Rd, Al Masani",
        "addressLocality": "Riyadh",
        "addressRegion": "Riyadh Province",
        "postalCode": "14714",
        "addressCountry": "SA"
      },
      "areaServed": [
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "Pakistan" },
        { "@type": "Region", "name": "Middle East" }
      ],
      "description": "FSAK Logistics is a top logistics company offering heavy transport, customs clearance, and supply chain solutions across Saudi Arabia, the Middle East, and Pakistan."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What logistics services does FSAK offer in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FSAK Logistics provides specialized land transport, heavy hauling, customs clearance, freight forwarding, and integrated supply chain solutions across Saudi Arabia."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide cross-border transportation to Pakistan or other Middle Eastern countries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we specialize in cross-border logistics connecting Saudi Arabia with Pakistan, the GCC, and other Middle Eastern regions, providing full customs handling."
          }
        },
        {
          "@type": "Question",
          "name": "How can I get a quote for a heavy transport project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can request a free quote by filling out our online contact form or by calling our support team directly. We typically respond within 24 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Is FSAK equipped for oversized and heavy cargo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. With a specialized fleet of over 100 vehicles, we are the trusted partner for oversized industrial equipment and heavy transport across the Kingdom."
          }
        },
        {
          "@type": "Question",
          "name": "Where is FSAK Logistics headquartered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our main operations hub and headquarters are located in Riyadh, Saudi Arabia, allowing us to serve the entire local and regional market efficiently."
          }
        }
      ]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ClientsSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <FAQSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
