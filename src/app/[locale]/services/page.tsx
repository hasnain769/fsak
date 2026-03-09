import { getTranslations, setRequestLocale } from 'next-intl/server';
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
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800',
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return {
        title: isAr ? 'خدماتنا' : 'Our Services | FSAK Logistics Solutions',
        description: isAr
            ? 'نقدم في شركة فيصل صالح عبدالكريم (FSAK) حلولاً لوجستية متكاملة تشمل النقل الثقيل والتخليص الجمركي والتخزين في السعودية والشرق الأوسط.'
            : 'Comprehensive supply chain solutions, heavy transport, customs clearance, and warehousing services by FSAK Logistics across Saudi Arabia, Pakistan, and the Middle East.',
        keywords: ['FSAK Logistics services', 'heavy transport Saudi Arabia', 'customs clearance Middle East', 'warehousing Pakistan', 'supply chain solutions']
    };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('ServicesPage');
    const st = await getTranslations('Services');

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": locale === 'ar' ? 'خدمات شركة FSAK Logistics' : 'FSAK Logistics Services',
        "description": "Comprehensive logistics and supply chain services in Saudi Arabia, Middle East, and Pakistan.",
        "url": `https://www.fsaklogistics.com/${locale}/services`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": SERVICES.map((service, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Service",
                    "name": st(`items.${service.key}.title`),
                    "description": st(`items.${service.key}.description`),
                    "url": `https://www.fsaklogistics.com/${locale}/services#${service.id}`
                }
            }))
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Banner */}
            <section className="relative h-72 md:h-96 flex items-center overflow-hidden bg-color-dark-grey">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2000')] bg-cover bg-center brightness-25" />
                <div className="absolute inset-0 bg-gradient-to-r from-color-dark-grey/95 to-color-primary/70" />
                <div className="container mx-auto px-6 relative z-10">
                    <span className="text-color-accent font-bold uppercase tracking-widest text-sm">{t('section_label')}</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-2 leading-tight">{t('title')}</h1>
                    <p className="text-gray-300 max-w-xl mt-4 text-lg">{t('subtitle')}</p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-zinc-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES.map((service) => (
                            <div key={service.id} id={service.id} className="group bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-zinc-100">
                                <div className="relative h-52 w-full overflow-hidden">
                                    <Image src={service.image} alt={st(`items.${service.key}.title`)} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-color-primary/60 group-hover:bg-color-primary/30 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-sm flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-color-dark-grey mb-3">{st(`items.${service.key}.title`)}</h3>
                                    <p className="text-gray-600 leading-relaxed flex-grow">{st(`items.${service.key}.description`)}</p>
                                    <Link href="/contact" className="mt-6 inline-flex items-center font-bold text-color-primary hover:text-color-accent transition-colors">
                                        {st('learn_more')}
                                        <svg className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Excellence Highlights */}
            <section className="py-24 bg-white border-t border-zinc-100">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-color-dark-grey mb-4">{t('highlights_heading')}</h2>
                        <div className="w-24 h-1 bg-color-primary mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6 text-color-primary shadow-inner">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-color-dark-grey mb-4">{t(`h${i}_title`)}</h3>
                                <p className="text-gray-600 leading-relaxed">{t(`h${i}_body`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Strip */}
            <section className="py-20 bg-color-primary text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-extrabold mb-4">{t('cta_heading')}</h2>
                    <p className="text-xl text-blue-200 mb-8 max-w-xl mx-auto">{t('cta_body')}</p>
                    <Link href="/contact" className="btn inline-block py-4 px-10 rounded-sm font-bold shadow-lg transition-colors">
                        {t('cta_btn')}
                    </Link>
                </div>
            </section>
        </>
    );
}
