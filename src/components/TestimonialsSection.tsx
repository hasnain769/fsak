import { useTranslations } from 'next-intl';

export default function TestimonialsSection() {
    const t = useTranslations('Testimonials');

    // Generate 5 mock reviews to populate the marquee
    // In a real app, these might come from an API or a structured JSON dictionary
    const REVIEWS = [
        { id: '1', author: 'Ahmed Al-Farsi', company: 'Saudi Aramco Base Oil Co.', stars: 5, quote: t('review_1') },
        { id: '2', author: 'Sarah Jenkins', company: 'Global Freight Forwarders', stars: 5, quote: t('review_2') },
        { id: '3', author: 'Mohammed Bin Salman', company: 'Riyadh Infrastructure', stars: 4, quote: t('review_3') },
        { id: '4', author: 'Elena Rostova', company: 'EuroMachinery Imports', stars: 5, quote: t('review_4') },
        { id: '5', author: 'Tariq Al-Nasser', company: 'Kingdom Constructors', stars: 5, quote: t('review_5') },
    ];

    // Duplicate the array so the flex container has exactly 5 sets to work with `100% / 5` correctly
    const marqueeItems = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

    return (
        <section className="py-24 bg-color-background border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 text-center max-w-2xl">
                <div className="inline-block border-b-4 border-color-accent pb-2 mb-4">
                    <span className="text-color-accent font-bold tracking-wider uppercase">{t('section_label') ?? 'Testimonials'}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {t('heading') ?? 'What Our Clients Say'}
                </h2>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full flex overflow-hidden group py-4">
                <div className="flex w-max animate-marquee rtl:animate-marquee-rtl hover:[animation-play-state:paused] items-stretch gap-6 md:gap-8 pe-6 md:pe-8">
                    {marqueeItems.map((review, idx) => (
                        <div key={`${review.id}-${idx}`} className="shrink-0 w-80 md:w-96 bg-color-surface border border-white/10 p-8 rounded-sm shadow-xl flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
                            <div>
                                {/* Quotation marks icon */}
                                <svg className="w-10 h-10 text-color-primary/40 mb-6" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                                {/* Stars */}
                                <div className="flex gap-1 mb-4 text-color-accent">
                                    {[...Array(review.stars)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-8 leading-relaxed">
                                    "{review.quote}"
                                </p>
                            </div>
                            <div className="border-t border-white/10 pt-4">
                                <h4 className="font-bold text-white tracking-wide">{review.author}</h4>
                                <p className="text-color-accent text-sm mt-1">{review.company}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edges Gradients for dark background */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-color-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-color-background to-transparent" />
            </div>
        </section>
    );
}
