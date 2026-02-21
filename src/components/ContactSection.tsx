'use client';

import { useTranslations } from 'next-intl';

export default function ContactSection() {
    const t = useTranslations('Contact');

    return (
        <section id="contact" className="py-24 bg-color-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-color-primary/5 hidden lg:block" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-color-accent/10 rounded-full blur-3xl mix-blend-multiply" />
            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <div className="inline-block border-s-4 border-color-accent ps-4 mb-4">
                        <span className="text-color-primary font-bold tracking-wider uppercase">{t('section_label')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                        {t('heading')}
                    </h2>
                    <p className="text-lg text-gray-400 mb-10 leading-relaxed font-medium">
                        {t('body')}
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start">
                            <div className="w-14 h-14 bg-color-primary/10 rounded-sm flex items-center justify-center text-color-primary mr-5 rtl:ml-5 rtl:mr-0 shrink-0">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">{t('call_us')}</h4>
                                <p className="text-gray-400 mt-1" dir="ltr">+966 558 736 888<br />+966 552 277 603</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-14 h-14 bg-color-primary/10 rounded-sm flex items-center justify-center text-color-primary mr-5 rtl:ml-5 rtl:mr-0 shrink-0">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">{t('email_us')}</h4>
                                <p className="text-gray-400 mt-1">info@fsak.sa</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-sm shadow-xl border border-zinc-100 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-color-dark-grey mb-8">{t('form_title')}</h3>
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Form submitted completely locally in this MVP demo.'); }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_name')}</label>
                                <input required type="text" className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" placeholder={t('form_name')} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_phone')}</label>
                                <input required type="tel" className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" placeholder={t('form_phone')} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_service')}</label>
                            <select required className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors">
                                <option value="">{t('form_service_placeholder')}</option>
                                <option value="land">Land Transport</option>
                                <option value="heavy">Heavy Transport</option>
                                <option value="customs">Customs Clearance</option>
                                <option value="warehousing">Warehousing</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_message')}</label>
                            <textarea required rows={4} className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" placeholder={t('form_message')}></textarea>
                        </div>
                        <button type="submit" className="btn w-full py-4 px-8 rounded-sm font-bold transition-all hover:-translate-y-0.5 mt-4">
                            {t('form_submit')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
