import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutSection() {
    const t = useTranslations('About');

    return (
        <section id="about" className="py-24 bg-color-background relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-color-primary/10 rounded-full blur-3xl" />
                    <div className="relative h-[400px] md:h-[500px] w-full bg-color-dark-grey rounded-sm overflow-hidden shadow-2xl z-10">
                        <Image
                            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop"
                            alt="FSAK Logistics Operations"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="hidden md:block absolute -bottom-8 -right-8 w-48 h-48 border-8 border-color-accent z-0" />
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="inline-block border-s-4 border-color-accent ps-4 mb-2">
                        <span className="text-color-primary font-bold tracking-wider uppercase">{t('section_label')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-color-dark-grey leading-tight">
                        {t('heading')}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                        {t('body')}
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <div className="border-t-2 border-color-primary/20 pt-4">
                            <h4 className="text-4xl font-black text-color-primary">100+</h4>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mt-1">{t('fleet_size')}</p>
                        </div>
                        <div className="border-t-2 border-color-primary/20 pt-4">
                            <h4 className="text-4xl font-black text-color-primary">24/7</h4>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mt-1">{t('support')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
