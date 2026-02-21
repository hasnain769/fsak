import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function ProjectsSection() {
    const t = useTranslations('Projects');

    const projects = [
        { id: 1, image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop', key: 'project_1' },
        { id: 2, image: '/project-port.png', key: 'project_2' },
        { id: 3, image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop', key: 'project_3' },
    ];

    return (
        <section id="projects" className="py-24 bg-color-dark-grey text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="inline-block border-b-4 border-color-accent pb-2 mb-4">
                            <span className="text-color-primary font-bold tracking-wider uppercase bg-white/10 px-3 py-1 rounded-sm">{t('section_label')}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            {t('heading')}
                        </h2>
                    </div>
                    <Link href="/projects" className="btn px-8 py-3 rounded-sm font-bold shrink-0">
                        {t('view_all')}
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative overflow-hidden rounded-sm cursor-pointer block border border-white/10">
                            <div className="relative h-80 w-full overflow-hidden">
                                <Image src={project.image} alt={t(`items.${project.key}.title`)} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-color-accent font-bold text-sm tracking-wider uppercase mb-2 block">{t(`items.${project.key}.category`)}</span>
                                <h3 className="text-2xl font-bold text-white mb-2">{t(`items.${project.key}.title`)}</h3>
                                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                                    <p className="text-gray-300 mt-2 line-clamp-2">{t(`items.${project.key}.description`)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
