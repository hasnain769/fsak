'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const CLIENTS = [
    { id: 'c1', src: '/clients/c1.png', alt: 'Client 1', url: 'https://jitex.sa/' },
    { id: 'c2', src: '/clients/c2.png', alt: 'Client 2', url: 'https://www.espac.com/' },
    { id: 'c3', src: '/clients/c3.png', alt: 'Client 3', url: 'https://www.mirajmedia.com/' },
];

export default function ClientsSection() {
    const t = useTranslations('Clients');

    // Duplicate the array multiple times so the marquee has enough content to scroll seamlessly
    const marqueeItems = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

    return (
        <section className="py-12 bg-color-background border-b border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">
                    {t('trusted_by') ?? 'Trusted By Industry Leaders'}
                </h3>
                <div className="w-16 h-1 bg-color-accent mx-auto mt-4"></div>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full flex overflow-hidden group">
                {/* 
                  The inner track needs to be wide enough to hold all items and animate continuously.
                  Hovering pauses the animation. 
                */}
                <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center space-x-12 md:space-x-24 px-6">
                    {marqueeItems.map((client, idx) => (
                        <a
                            key={`${client.id}-${idx}`}
                            href={client.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block shrink-0 w-32 h-20 md:w-48 md:h-24 relative transition-transform hover:scale-105 duration-300"
                        >
                            <Image
                                src={client.src}
                                alt={client.alt}
                                fill
                                className="object-contain"
                            />
                        </a>
                    ))}
                </div>

                {/* Fade gradients on edges for a seamless look */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-color-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-color-background to-transparent" />
            </div>
        </section>
    );
}
