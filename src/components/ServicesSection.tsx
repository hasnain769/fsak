import { useTranslations } from 'next-intl';

export default function ServicesSection() {
    const t = useTranslations('Services');

    const services = [
        { id: 'land', key: 'land_transport', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' }, // Generic placeholder icons
        { id: 'heavy', key: 'heavy_transport', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
        { id: 'customs', key: 'customs_clearance', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'freight', key: 'freight_services', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'warehousing', key: 'warehousing', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { id: 'supply', key: 'supply_chain', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' }
    ];

    return (
        <section id="services" className="py-24 bg-zinc-50 border-t border-color-dark-grey/5">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-block border-b-4 border-color-accent pb-2 mb-4">
                        <span className="text-color-primary font-bold tracking-wider uppercase">{t('section_label')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-color-dark-grey leading-tight">
                        {t('heading')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group bg-white p-8 border border-zinc-200 hover:border-color-primary shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-color-primary group-hover:h-full transition-all duration-300" />
                            <div className="w-16 h-16 bg-color-primary/10 text-color-primary flex items-center justify-center rounded-sm mb-6 group-hover:bg-color-primary group-hover:text-white transition-colors duration-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-color-dark-grey mb-3">{t(`items.${service.key}.title`)}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {t(`items.${service.key}.description`)}
                            </p>
                            <a href={`/services#${service.id}`} className="inline-flex items-center text-color-primary font-bold hover:text-color-accent transition-colors">
                                {t('learn_more')}
                                <svg className="w-5 h-5 rtl:rotate-180 ml-2 rtl:ml-0 rtl:mr-2 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
