'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const SERVICES = [
    {
        id: 'land',
        key: 'land_transport',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800',
        icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    },
    {
        id: 'heavy',
        key: 'heavy_transport',
        image: '/service-heavy-transport.png',
        icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4',
    },
    {
        id: 'customs',
        key: 'customs_clearance',
        image: '/project-port.png',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
        id: 'freight',
        key: 'freight_services',
        image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?q=80&w=800',
        icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9',
    },
    {
        id: 'warehousing',
        key: 'warehousing',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800',
        icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    },
    {
        id: 'supply',
        key: 'supply_chain',
        image: '/service-supply-chain.png',
        icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    },
    {
        id: 'cross',
        key: 'cross_border_transport',
        image: '/service-cross-border.png',
        icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
];

export default function ServicesSection() {
    const t = useTranslations('Services');

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": SERVICES.map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Service",
                "name": t(`items.${service.key}.title`),
                "url": `https://www.fsaklogistics.com/services#${service.id}`
            }
        }))
    };

    return (
        <section id="services" className="py-24 bg-color-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-6">

                {/* Section header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-block border-b-4 border-color-accent pb-2 mb-4">
                        <span className="text-color-accent font-bold tracking-wider uppercase">{t('section_label')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        {t('heading')}
                    </h2>
                </div>

                {/* Image cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {SERVICES.map((service) => (
                        <Link
                            key={service.id}
                            href={`/services#${service.id}`}
                            className="group relative overflow-hidden rounded-sm block border border-white/8 hover:border-color-accent transition-colors duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={t(`items.${service.key}.title`)}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Dark gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                            </div>

                            {/* Card content */}
                            <div className="absolute bottom-0 left-0 w-full p-5">
                                {/* Icon badge */}
                                <div className="w-10 h-10 bg-color-accent rounded-sm flex items-center justify-center mb-3 shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white leading-tight">
                                    {t(`items.${service.key}.title`)}
                                </h3>
                                {/* Arrow — slides in on hover */}
                                <div className="flex items-center gap-2 mt-2 text-color-accent text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {t('learn_more')}
                                    <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link href="/services" className="btn px-10 py-4 rounded-sm font-bold inline-block">
                        {t('view_all_services') ?? 'View All Services'}
                    </Link>
                </div>
            </div>
        </section>
    );
}
