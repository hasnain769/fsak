import { useTranslations } from 'next-intl';

export default function TestimonialsSection() {
    const t = useTranslations('Testimonials');

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <svg className="w-16 h-16 mx-auto text-color-primary/20 mb-8" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <h2 className="text-3xl md:text-5xl font-bold text-color-dark-grey leading-tight mb-8">
                    "{t('quote')}"
                </h2>
                <div className="inline-block flex-col justify-center items-center">
                    <div className="font-bold text-xl text-color-primary">{t('author')}</div>
                    <div className="text-gray-500 uppercase tracking-wider text-sm mt-1">{t('company')}</div>
                </div>
            </div>
        </section>
    );
}
