'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const FAQ_ITEMS = ['q1', 'q2', 'q3', 'q4', 'q5'];

export default function FAQSection() {
    const t = useTranslations('FAQ');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-[#0b0b12] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-color-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-color-accent/5 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block border-b-4 border-color-accent pb-2 mb-4">
                        <span className="text-color-accent font-bold tracking-wider uppercase">{t('section_label')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        {t('heading')}
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {FAQ_ITEMS.map((item, index) => (
                        <div
                            key={item}
                            className="border border-white/10 rounded-sm overflow-hidden bg-white/5 backdrop-blur-sm transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left rtl:text-right hover:bg-white/10 transition-colors group"
                            >
                                <span className="text-lg md:text-xl font-bold text-white group-hover:text-color-accent transition-colors">
                                    {t(`items.${item}`)}
                                </span>
                                <svg
                                    className={`w-6 h-6 text-color-accent transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-400 text-lg leading-relaxed border-t border-white/5 mt-2">
                                    {t(`items.a${index + 1}`)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
