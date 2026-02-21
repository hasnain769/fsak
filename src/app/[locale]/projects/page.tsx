import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const PROJECTS = [
    {
        id: 1,
        key: 'project_1',
        image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=900',
        category_key: 'heavy_transport',
    },
    {
        id: 2,
        key: 'project_2',
        image: '/project-port.png',
        category_key: 'customs_clearance',
    },
    {
        id: 3,
        key: 'project_3',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=900',
        category_key: 'warehousing',
    },
    {
        id: 4,
        key: 'project_4',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=900',
        category_key: 'land_transport',
    },
    {
        id: 5,
        key: 'project_5',
        image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?q=80&w=900',
        category_key: 'freight_services',
    },
    {
        id: 6,
        key: 'project_6',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=900',
        category_key: 'supply_chain',
    },
];

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('ProjectsPage');
    const pt = await getTranslations('Projects');
    const st = await getTranslations('Services.items');

    return (
        <>
            {/* Hero Banner */}
            <section className="relative h-72 md:h-96 flex items-center overflow-hidden bg-color-dark-grey">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2000')] bg-cover bg-center brightness-25" />
                <div className="absolute inset-0 bg-gradient-to-r from-color-dark-grey/90 to-color-primary/60" />
                <div className="container mx-auto px-6 relative z-10">
                    <span className="text-color-accent font-bold uppercase tracking-widest text-sm">{t('section_label')}</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-2">{t('title')}</h1>
                    <p className="text-gray-300 max-w-xl mt-4 text-lg">{t('subtitle')}</p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PROJECTS.map((project) => (
                            <div key={project.id} className="group relative overflow-hidden bg-zinc-900 rounded-sm shadow-xl cursor-pointer">
                                <div className="relative h-72 w-full overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={pt(`items.${project.key}.title`)}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 w-full p-6">
                                    <span className="inline-block bg-color-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 mb-3 rounded-sm">
                                        {st(`${project.category_key}.title`)}
                                    </span>
                                    <h3 className="text-xl font-bold text-white">{pt(`items.${project.key}.title`)}</h3>
                                    <p className="text-gray-300 text-sm mt-1 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {pt(`items.${project.key}.description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-zinc-50 border-t border-zinc-200 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-extrabold text-color-dark-grey mb-4">{t('cta_heading')}</h2>
                    <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">{t('cta_body')}</p>
                    <Link href="/contact" className="btn inline-block py-4 px-10 rounded-sm font-bold shadow-md transition-colors">
                        {t('cta_btn')}
                    </Link>
                </div>
            </section>
        </>
    );
}
