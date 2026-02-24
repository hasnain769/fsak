import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
    const t = useTranslations('Footer');
    const locale = useLocale();

    return (
        <footer className="bg-color-dark-grey text-white py-14 border-t-8 border-color-primary">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="col-span-1 md:col-span-1 border-r-0 md:border-r border-white/10 pr-6">
                    <Image
                        src={locale === 'ar' ? "/FSAK Arabic Logo.png" : "/FSAK English logo.png"}
                        alt="FSAK Logistics Logo"
                        width={180}
                        height={60}
                        className="object-contain opacity-95 mb-6"
                    />
                    <p className="text-sm text-gray-400 leading-relaxed">{t('tagline')}</p>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">{t('quick_links')}</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link href="/about" className="hover:text-color-accent transition-colors">{t('about')}</Link></li>
                        <li><Link href="/services" className="hover:text-color-accent transition-colors">{t('services')}</Link></li>
                        <li><Link href="/projects" className="hover:text-color-accent transition-colors">{t('projects')}</Link></li>
                        <li><Link href="/contact" className="hover:text-color-accent transition-colors">{t('contact')}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">{t('services')}</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link href="/services#land" className="hover:text-color-accent transition-colors">{t('land_transport')}</Link></li>
                        <li><Link href="/services#heavy" className="hover:text-color-accent transition-colors">{t('heavy_transport')}</Link></li>
                        <li><Link href="/services#customs" className="hover:text-color-accent transition-colors">{t('customs_clearance')}</Link></li>
                        <li><Link href="/services#freight" className="hover:text-color-accent transition-colors">{t('freight_services')}</Link></li>
                        <li><Link href="/services#warehousing" className="hover:text-color-accent transition-colors">{t('warehousing')}</Link></li>
                        <li><Link href="/services#supply" className="hover:text-color-accent transition-colors">{t('supply_chain')}</Link></li>
                        <li><Link href="/services#cross" className="hover:text-color-accent transition-colors">{t('cross_border')}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">{t('contact_us')}</h4>
                    <address className="not-italic text-sm text-gray-400 space-y-4">
                        <p className="flex flex-col"><strong className="text-white mb-1">{t('phone')}:</strong><a href="tel:+966558736888" className="hover:text-color-accent">+966 558 736 888</a> <a href="tel:+966552277603" className="hover:text-color-accent">+966 552 277 603</a></p>
                        <p className="flex flex-col"><strong className="text-white mb-1">{t('email')}:</strong><a href="mailto:info@fsak.sa" className="hover:text-color-accent transition-colors">info@fsak.sa</a></p>
                        <p className="flex flex-col"><strong className="text-white mb-1">{t('location')}:</strong><span>An Nasr Rd, Al Masani,<br />Riyadh 14714</span></p>
                    </address>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-14 pt-8 border-t border-white/10 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} FSAK Logistics. {t('all_rights_reserved')}.</p>
                <div className="flex space-x-6">
                    <span className="hover:text-color-accent cursor-pointer transition-colors">LinkedIn</span>
                    <span className="hover:text-color-accent cursor-pointer transition-colors">Instagram</span>
                    <span className="hover:text-color-accent cursor-pointer transition-colors">Facebook</span>
                    <span className="hover:text-color-accent cursor-pointer transition-colors">TikTok</span>
                </div>
            </div>
        </footer>
    );
}
