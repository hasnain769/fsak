'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';

export default function ContactPage() {
    const t = useTranslations('Contact');
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <>
            {/* Hero Banner */}
            <section className="relative h-64 md:h-80 flex items-center overflow-hidden bg-color-dark-grey">
                <div className="absolute inset-0 bg-gradient-to-br from-color-primary to-color-dark-grey" />
                <div className="container mx-auto px-6 relative z-10">
                    <span className="text-color-accent font-bold uppercase tracking-widest text-sm">{t('section_label')}</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-2">{t('heading')}</h1>
                </div>
            </section>

            {/* Contact Details + Form */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold text-color-dark-grey mb-2">{t('info_heading')}</h2>
                            <p className="text-gray-500 leading-relaxed">{t('body')}</p>
                        </div>

                        <address className="not-italic space-y-8">
                            {/* Phone */}
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-color-primary/10 rounded-sm flex items-center justify-center text-color-primary shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-color-dark-grey mb-1">{t('call_us')}</h4>
                                    <a href="tel:+966558736888" className="text-gray-600 hover:text-color-primary transition-colors block" dir="ltr">+966 558 736 888</a>
                                    <a href="tel:+966552277603" className="text-gray-600 hover:text-color-primary transition-colors block" dir="ltr">+966 552 277 603</a>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-color-primary/10 rounded-sm flex items-center justify-center text-color-primary shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-color-dark-grey mb-1">{t('email_us')}</h4>
                                    <a href="mailto:info@fsak.sa" className="text-gray-600 hover:text-color-primary transition-colors">info@fsak.sa</a>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-color-primary/10 rounded-sm flex items-center justify-center text-color-primary shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-color-dark-grey mb-1">{t('address_label')}</h4>
                                    <p className="text-gray-600 leading-relaxed">An Nasr Rd, Al Masani,<br />Riyadh 14714, Saudi Arabia</p>
                                </div>
                            </div>
                        </address>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-10 bg-zinc-50 border border-zinc-200 rounded-sm">
                                <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h3 className="text-2xl font-bold text-color-dark-grey mb-2">{t('success_title')}</h3>
                                <p className="text-gray-500">{t('success_body')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-zinc-50 p-8 md:p-10 border border-zinc-200 space-y-6">
                                <h3 className="text-3xl font-bold text-color-dark-grey">{t('form_title')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_name')} *</label>
                                        <input required type="text" className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_phone')} *</label>
                                        <input required type="tel" className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_email')} *</label>
                                    <input required type="email" className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_service')}</label>
                                    <select className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors">
                                        <option value="">{t('form_service_placeholder')}</option>
                                        <option value="land">Land Transport / النقل البري</option>
                                        <option value="heavy">Heavy Transport / النقل الثقيل</option>
                                        <option value="customs">Customs Clearance / التخليص الجمركي</option>
                                        <option value="freight">Freight Services / خدمات الشحن</option>
                                        <option value="warehousing">Warehousing / التخزين</option>
                                        <option value="supply">Supply Chain / سلسلة التوريد</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_message')}</label>
                                    <textarea rows={5} className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors"></textarea>
                                </div>
                                {/* Honeypot */}
                                <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden="true" />
                                <button type="submit" className="btn w-full py-4 px-8 rounded-sm font-bold transition-all shadow-md hover:-translate-y-0.5">
                                    {t('form_submit')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Google Maps — Al Masani, Riyadh, Saudi Arabia */}
            <section className="h-96 bg-zinc-900">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5263854!2d46.6504!3d24.7260!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0329b9c736a5%3A0x6508f48ca87f565c!2sAl%20Masani%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1708561234567!5m2!1sen!2ssa"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FSAK Logistics — Al Masani, Riyadh"
                />
            </section>
        </>
    );
}
