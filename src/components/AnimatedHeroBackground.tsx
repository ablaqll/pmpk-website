import React from 'react';

export function AnimatedHeroBackground() {
    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f2847] via-[#1e3a5f] to-[#2a4a72]" />

            {/* Animated glowing orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227]/20 rounded-full blur-[100px] animate-pulse transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-[80px] animate-pulse transform -translate-x-1/3 translate-y-1/3" style={{ animationDelay: '1s' }} />

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Modern Wave Divider */}
            <div className="absolute -bottom-1 left-0 right-0 overflow-hidden" style={{ transform: "translateZ(0)" }}>
                <svg
                    viewBox="0 0 1440 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto text-gray-50 drop-shadow-[0_-4px_16px_rgba(255,255,255,0.1)] relative"
                    style={{ minWidth: '100%', display: 'block' }}
                >
                    <path
                        d="M0,60 L1440,60 L1440,20 C1200,60 960,0 720,20 C480,40 240,0 0,20 L0,60 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </>
    );
}
