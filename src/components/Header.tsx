'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const t = useTranslations('Header');
    const locale = useLocale();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // If we're at the root path or any other, next-intl Link with locale prop 
    // correctly links to the localized version of that path.
    const toggleLocale = locale === 'en' ? 'ar' : 'en';

    return (
        <header className="sticky top-0 z-50 w-full bg-[#0e0e16]/95 backdrop-blur-md border-b border-white/8 shadow-lg">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* We assume the logo is around 3:1 ratio */}
                    <Image src="/logo.png" alt="FSAK Logistics Logo" width={150} height={50} className="object-contain" priority />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 font-medium">
                    <Link href="/about" className="hover:text-color-primary transition-colors">{t('about')}</Link>
                    <Link href="/services" className="hover:text-color-primary transition-colors">{t('services')}</Link>
                    <Link href="/projects" className="hover:text-color-primary transition-colors">{t('projects')}</Link>
                </nav>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/contact" className="bg-color-accent hover:bg-orange-500 text-white px-6 py-2.5 rounded-sm font-semibold transition-colors shadow-[0_0_0_2px_rgba(255,140,0,0.4)] hover:shadow-[0_0_0_4px_rgba(255,140,0,0.3)]">
                        {t('get_quote')}
                    </Link>
                </div>

                {/* Language switcher — always visible, desktop + mobile */}
                <div className="flex items-center gap-3">
                    <Link
                        href={pathname}
                        locale={toggleLocale}
                        className="font-bold text-sm tracking-wider uppercase text-white/70 hover:text-color-accent transition-colors border border-white/20 hover:border-color-accent px-3 py-1.5 rounded-sm"
                    >
                        {locale === 'en' ? 'العربية' : 'EN'}
                    </Link>

                    {/* Mobile hamburger */}
                    <button className="md:hidden p-2 text-color-foreground" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#0e0e16] border-b border-white/8 border-t border-t-white/5 absolute top-20 left-0 w-full flex flex-col px-6 py-6 space-y-4 font-medium shadow-2xl">
                    <Link href="/about" className="block w-full py-2 hover:text-color-primary" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
                    <Link href="/services" className="block w-full py-2 hover:text-color-primary" onClick={() => setIsMenuOpen(false)}>{t('services')}</Link>
                    <Link href="/projects" className="block w-full py-2 hover:text-color-primary" onClick={() => setIsMenuOpen(false)}>{t('projects')}</Link>
                    <Link href="/contact" className="block w-full py-2 hover:text-color-primary" onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link>
                    <hr className="border-color-dark-grey/10 my-2" />
                    <Link href={pathname} locale={toggleLocale} className="block w-full py-2 font-bold text-color-primary" onClick={() => setIsMenuOpen(false)}>
                        {locale === 'en' ? 'Switch to Arabic (العربية)' : 'Switch to English (EN)'}
                    </Link>
                    <Link href="/contact" className="block w-full text-center mt-4 bg-color-accent text-white px-6 py-3 rounded-sm font-semibold shadow-md" onClick={() => setIsMenuOpen(false)}>
                        {t('get_quote')}
                    </Link>
                </div>
            )}
        </header>
    );
}
