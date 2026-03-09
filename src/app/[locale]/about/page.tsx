import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return {
        title: isAr ? 'من نحن' : 'About Us | Top Logistics Company in Saudi Arabia & Middle East',
        description: isAr
            ? 'تعرف على شركة فيصل صالح عبدالكريم (FSAK)، الرائدة في مجال النقل الثقيل والخدمات اللوجستية وتخليص الجمارك في المملكة العربية السعودية والشرق الأوسط.'
            : 'Discover FSAK Logistics, a premier provider of heavy transport, supply chain, and customs clearance services across Saudi Arabia, the Middle East, and Pakistan. Over 10 years of experience.',
        keywords: ['FSAK Logistics', 'logistics in Saudi Arabia', 'Middle East logistics', 'Pakistan supply chain', 'heavy transport fleet']
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('AboutPage');
    const isAr = locale === 'ar';

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": isAr ? "من نحن - FSAK Logistics" : "About FSAK Logistics",
        "description": isAr
            ? "تعرف على شركة فيصل صالح عبدالكريم (FSAK)، الرائدة في مجال النقل الثقيل والخدمات اللوجستية في المملكة العربية السعودية."
            : "Discover FSAK Logistics, a premier provider of heavy transport across Saudi Arabia, the Middle East, and Pakistan.",
        "url": `https://www.fsaklogistics.com/${locale}/about`,
        "mainEntity": {
            "@id": "https://www.fsaklogistics.com",
            "@type": "LogisticsService",
            "name": "FSAK Logistics",
            "foundingDate": "2014"
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
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2000')] bg-cover bg-center brightness-30" />
                <div className="absolute inset-0 bg-gradient-to-r from-color-primary/90 to-color-dark-grey/80" />
                <div className="container mx-auto px-6 relative z-10">
                    <span className="text-color-accent font-bold uppercase tracking-widest text-sm">{t('section_label')}</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-2 leading-tight">{t('title')}</h1>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-color-dark-grey">{t('who_heading')}</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">{t('who_body_1')}</p>
                        <p className="text-lg text-gray-600 leading-relaxed">{t('who_body_2')}</p>
                    </div>
                    <div className="relative h-[400px] w-full overflow-hidden shadow-2xl rounded-sm">
                        <Image src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200" alt="FSAK Fleet" fill className="object-cover" />
                        <div className="absolute bottom-4 left-4 right-4 bg-color-primary/90 backdrop-blur px-6 py-4 text-white">
                            <div className="font-bold text-xl">Since 2014</div>
                            <div className="text-sm text-blue-200">{t('founded_label')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-zinc-50 border-y border-zinc-200">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { num: '100+', label: t('stat_fleet') },
                        { num: '500+', label: t('stat_projects') },
                        { num: '6', label: t('stat_services') },
                        { num: '10+', label: t('stat_years') },
                    ].map(({ num, label }) => (
                        <div key={label} className="group border-b-4 border-transparent hover:border-color-accent pb-4 transition-all">
                            <div className="text-5xl font-black text-color-primary mb-2">{num}</div>
                            <div className="text-sm font-bold uppercase tracking-wider text-gray-500">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-color-dark-grey mb-4">{t('why_choose_heading')}</h2>
                        <div className="w-24 h-1 bg-color-accent mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow bg-zinc-50 rounded-sm">
                                <div className="w-12 h-12 bg-color-primary text-white flex items-center justify-center font-bold text-2xl mb-6">
                                    0{i}
                                </div>
                                <h3 className="text-2xl font-bold text-color-dark-grey mb-4">
                                    {t(`why_item_${i}_title`)}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t(`why_item_${i}_body`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-color-dark-grey text-white">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="border-s-4 border-color-accent ps-8">
                        <h3 className="text-3xl font-bold mb-4">{t('mission_heading')}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">{t('mission_body')}</p>
                    </div>
                    <div className="border-s-4 border-color-primary ps-8">
                        <h3 className="text-3xl font-bold mb-4">{t('vision_heading')}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">{t('vision_body')}</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-color-accent text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-extrabold mb-4">{t('cta_heading')}</h2>
                    <p className="text-xl text-orange-100 mb-8 max-w-xl mx-auto">{t('cta_body')}</p>
                    <Link href="/contact" className="btn inline-block py-4 px-10 rounded-sm font-bold shadow-lg">
                        {t('cta_btn')}
                    </Link>
                </div>
            </section>
        </>
    );
}
