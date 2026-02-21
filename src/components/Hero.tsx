'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-[#0b0b12]">

            {/* Full-bleed background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt="FSAK Logistics fleet on Saudi highway"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Multi-layer overlay: left heavy, right fades */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b12] via-[#0b0b12]/85 to-[#0b0b12]/30" />
                {/* Bottom fade to match page background */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111118] to-transparent" />
            </div>

            {/* Orange accent stripe — left rail */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-color-accent z-10" />

            <div className="container mx-auto px-8 md:px-12 relative z-10 py-24 md:py-0">
                <div className="max-w-3xl space-y-8">

                    {/* Eyebrow label */}
                    <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                        <div className="h-px w-12 bg-color-accent" />
                        <span className="text-color-accent font-bold text-sm tracking-[0.25em] uppercase">
                            Kingdom of Saudi Arabia
                        </span>
                    </div>

                    {/* Main heading */}
                    <h1
                        className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tight uppercase text-white animate-fade-in-up"
                        style={{ animationDelay: '100ms' }}
                    >
                        {t('headline_1')}{' '}
                        <span className="text-color-accent drop-shadow-[0_0_30px_rgba(255,140,0,0.5)]">
                            {t('headline_highlight')}
                        </span>
                        <br />
                        {t('headline_2')}
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed animate-fade-in-up"
                        style={{ animationDelay: '200ms' }}
                    >
                        {t('subheadline')}
                    </p>

                    {/* CTAs */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up"
                        style={{ animationDelay: '300ms' }}
                    >
                        <Link
                            href="/contact"
                            className="btn px-10 py-5 rounded-sm text-center font-bold text-lg tracking-wide shadow-[0_8px_30px_rgba(255,140,0,0.35)] hover:-translate-y-1 transition-transform"
                        >
                            {t('cta_primary')}
                        </Link>
                        <Link
                            href="/services"
                            className="px-10 py-5 rounded-sm text-center font-bold text-lg tracking-wide text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all hover:-translate-y-1"
                        >
                            {t('cta_secondary')}
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div
                        className="flex flex-wrap gap-10 pt-6 border-t border-white/10 animate-fade-in-up"
                        style={{ animationDelay: '400ms' }}
                    >
                        {[
                            { num: '10+', label: 'Years Experience' },
                            { num: '100+', label: 'Fleet Vehicles' },
                            { num: '500+', label: 'Projects Done' },
                        ].map(({ num, label }) => (
                            <div key={label} className="flex flex-col">
                                <span className="text-4xl font-black text-color-accent">{num}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
