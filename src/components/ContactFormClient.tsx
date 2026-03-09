'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';

export default function ContactFormClient() {
    const t = useTranslations('Contact');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        // Anti-spam honeypot
        if (formData.get('_honey')) return;

        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message'),
            source: 'Standalone Contact Page',
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to send email');

            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch {
            setStatus('error');
            setErrorMessage(t('form_error_message') || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="lg:col-span-3">
            {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-10 bg-green-500/10 border border-green-500/20 rounded-sm">
                    <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="text-2xl font-bold text-color-dark-grey mb-2">{t('success_title')}</h3>
                    <p className="text-gray-600">{t('form_success_message') || 'Your message has been successfully sent. We will get back to you shortly.'}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-zinc-50 p-8 md:p-10 border border-zinc-200 space-y-6">
                    <h3 className="text-3xl font-bold text-color-dark-grey">{t('form_title')}</h3>

                    {status === 'error' && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-sm">
                            {errorMessage}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_name')} *</label>
                            <input name="name" required type="text" className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_phone')} *</label>
                            <input name="phone" required type="tel" className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_email')} *</label>
                        <input name="email" required type="email" className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_service')}</label>
                        <select name="service" className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors appearance-none">
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
                        <textarea name="message" required rows={5} className="w-full bg-white border border-zinc-300 px-4 py-3 focus:outline-none focus:border-color-primary transition-colors"></textarea>
                    </div>
                    {/* Honeypot */}
                    <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden="true" />
                    <button disabled={status === 'loading'} type="submit" className="btn w-full py-4 px-8 rounded-sm font-bold transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0">
                        {status === 'loading' ? (t('form_sending') || 'Sending...') : t('form_submit')}
                    </button>
                </form>
            )}
        </div>
    );
}
