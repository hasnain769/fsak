import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactFormClient from '@/components/ContactFormClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return {
        title: isAr ? 'اتصل بنا' : 'Contact Us | FSAK Logistics Saudi Arabia',
        description: isAr
            ? 'تواصل مع فريق الدعم في شركة فيصل صالح عبدالكريم (FSAK) لخدمات النقل والخدمات اللوجستية في السعودية.'
            : 'Contact FSAK Logistics for premier heavy transport, customs clearance, and supply chain solutions in Riyadh, Saudi Arabia, the Middle East, and Pakistan.',
    };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Contact');

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact FSAK Logistics",
        "description": "Get in touch with FSAK Logistics for heavy transport and supply chain solutions.",
        "mainEntity": {
            "@id": "https://www.fsaklogistics.com",
            "@type": "LogisticsService",
            "name": "FSAK Logistics",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "An Nasr Rd, Al Masani",
                "addressLocality": "Riyadh",
                "postalCode": "14714",
                "addressCountry": "SA"
            },
            "telephone": ["+966558736888", "+966552277603"],
            "email": "contact@fsaklogistics.com",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 24.5826,
                "longitude": 46.7214
            }
        }
    };


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Banner */}
            <section className="relative h-64 md:h-80 flex items-center overflow-hidden bg-color-dark-grey">
                <div className="absolute inset-0 bg-gradient-to-br from-color-primary to-color-dark-grey" />
                <div className="container mx-auto px-6 relative z-10">
                    <span className="text-color-accent font-bold uppercase tracking-widest text-sm">{t('section_label')}</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-2">{t('heading')}</h1>
                </div>
            </section>

            {/* Contact Details + Form */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold text-color-dark-grey mb-2">{t('info_heading')}</h2>
                            <p className="text-gray-500 leading-relaxed">{t('body')}</p>
                        </div>

                        <address className="not-italic space-y-8">
                            {/* Phone */}
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-color-primary/10 rounded-sm flex items-center justify-center text-color-primary shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-color-dark-grey mb-1">{t('call_us')}</h4>
                                    <a href="tel:+966558736888" className="text-gray-600 hover:text-color-primary transition-colors block" dir="ltr">+966 558 736 888</a>
                                    <a href="tel:+966552277603" className="text-gray-600 hover:text-color-primary transition-colors block" dir="ltr">+966 552 277 603</a>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-color-primary/10 rounded-sm flex items-center justify-center text-color-primary shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-color-dark-grey mb-1">{t('email_us')}</h4>
                                    <a href="mailto:contact@fsaklogistics.com" className="text-gray-600 hover:text-color-primary transition-colors">contact@fsaklogistics.com</a>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-color-primary/10 rounded-sm flex items-center justify-center text-color-primary shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-color-dark-grey mb-1">{t('address_label')}</h4>
                                    <p className="text-gray-600 leading-relaxed">An Nasr Rd, Al Masani,<br />Riyadh 14714, Saudi Arabia</p>
                                </div>
                            </div>
                        </address>
                    </div>

                    {/* Form */}
                    <ContactFormClient />
                </div>
            </section>

            {/* Google Maps — Al Masani, Riyadh, Saudi Arabia */}
            <section className="h-96 bg-zinc-900">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5263854!2d46.6504!3d24.7260!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0329b9c736a5%3A0x6508f48ca87f565c!2sAl%20Masani%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1708561234567!5m2!1sen!2ssa"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FSAK Logistics — Al Masani, Riyadh"
                />
            </section>
        </>
    );
}
