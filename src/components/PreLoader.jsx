import React, { useEffect, useState } from 'react';

const ORANGE = '#f55b14';
const NAVY   = '#131e3c';
const DEEP   = '#0b1120';

const PreLoader = () => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase]       = useState(0); // 0=filling 1=done

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(interval); setPhase(1); return 100; }
                return p + Math.random() * 12 + 4;
            });
        }, 80);
        return () => clearInterval(interval);
    }, []);

    // inject keyframes once
    useEffect(() => {
        if (document.getElementById('preloader-kf')) return;
        const s = document.createElement('style');
        s.id = 'preloader-kf';
        s.textContent = `
            @keyframes hexSpin   { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
            @keyframes hexSpinR  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
            @keyframes moltenDrip{ 0%,100%{transform:scaleY(1) translateY(0)} 50%{transform:scaleY(1.08) translateY(4px)} }
            @keyframes particleFloat {
                0%   { transform: translateY(0px) translateX(0px); opacity: 0.6; }
                33%  { transform: translateY(-18px) translateX(8px); opacity: 1; }
                66%  { transform: translateY(-8px) translateX(-6px); opacity: 0.7; }
                100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
            }
            @keyframes castingPulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
            @keyframes scanLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
            @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px #f55b1433} 50%{box-shadow:0 0 40px #f55b1466} }
            @keyframes textBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }
            @keyframes fadeIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        `;
        document.head.appendChild(s);
    }, []);

    const clamp = v => Math.min(100, Math.max(0, v));

    return (
        <div style={styles.overlay}>

            {/* bg grid */}
            <div style={styles.grid} />

            {/* floating particles */}
            {[
                { top:'15%', left:'10%', delay:'0s',   size:6  },
                { top:'25%', left:'85%', delay:'0.6s', size:4  },
                { top:'70%', left:'8%',  delay:'1.1s', size:5  },
                { top:'75%', left:'88%', delay:'0.3s', size:7  },
                { top:'45%', left:'5%',  delay:'0.8s', size:3  },
                { top:'55%', left:'92%', delay:'1.4s', size:4  },
            ].map((p, i) => (
                <div key={i} style={{
                    position: 'absolute', top: p.top, left: p.left,
                    width: p.size, height: p.size, borderRadius: '50%',
                    background: ORANGE, opacity: 0.5,
                    animation: `particleFloat ${2.5 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: p.delay,
                }} />
            ))}

            {/* center content */}
            <div style={styles.center}>

                {/* Hex illustration */}
                <div style={styles.hexWrap}>

                    {/* rotating rings */}
                    <div style={{ ...styles.ring, width: 200, height: 200, animationDuration: '8s' }} />
                    <div style={{ ...styles.ringR, width: 160, height: 160, animationDuration: '5s' }} />

                    {/* main SVG */}
                    <svg viewBox="0 0 200 200" style={styles.svg} xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="pGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%"   stopColor={ORANGE} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={ORANGE} stopOpacity="0"   />
                            </radialGradient>
                            <clipPath id="hexClip">
                                <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" />
                            </clipPath>
                        </defs>

                        {/* outer hex border */}
                        <polygon points="100,18 172,59 172,141 100,182 28,141 28,59"
                            fill="none" stroke={ORANGE} strokeWidth="1.5" opacity="0.3" />

                        {/* middle hex */}
                        <polygon points="100,32 158,66 158,134 100,168 42,134 42,66"
                            fill="none" stroke={ORANGE} strokeWidth="1" opacity="0.2" />

                        {/* inner filled hex */}
                        <polygon points="100,20 170,60 170,140 100,180 30,140 30,60"
                            fill={NAVY} opacity="0.95" />

                        {/* glow center */}
                        <circle cx="100" cy="100" r="55" fill="url(#pGlow)" />

                        {/* scan line */}
                        <rect x="30" y="0" width="140" height="3" fill={ORANGE} opacity="0.4"
                            clipPath="url(#hexClip)"
                            style={{ animation: 'scanLine 2s linear infinite' }} />

                        {/* mold shape — die casting mold lines */}
                        <rect x="68" y="72" width="64" height="56" rx="4"
                            fill="none" stroke={ORANGE} strokeWidth="1.5" opacity="0.7" />
                        <rect x="76" y="80" width="48" height="40" rx="3"
                            fill={ORANGE} opacity="0.12" />

                        {/* molten fill bar inside mold (progress-driven) */}
                        <clipPath id="fillClip">
                            <rect x="76" y={80 + 40 * (1 - clamp(progress) / 100)} width="48" height={40 * clamp(progress) / 100} rx="2" />
                        </clipPath>
                        <rect x="76" y="80" width="48" height="40" rx="3"
                            fill={ORANGE} opacity="0.65" clipPath="url(#fillClip)"
                            style={{ transition: 'all 0.1s linear' }} />

                        {/* molten drip */}
                        <ellipse cx="100" cy="76" rx="8" ry="5" fill={ORANGE} opacity="0.8"
                            style={{ animation: 'moltenDrip 1.2s ease-in-out infinite' }} />

                        {/* casting label */}
                        <text x="100" y="148" textAnchor="middle"
                            fill="#fff" fontSize="9" fontWeight="800" letterSpacing="2" opacity="0.8">
                            KAMP
                        </text>
                        <text x="100" y="160" textAnchor="middle"
                            fill={ORANGE} fontSize="6.5" fontWeight="600" letterSpacing="1.5" opacity="0.9">
                            INFO SERVICES
                        </text>

                        {/* corner marks */}
                        <rect x="30" y="28" width="16" height="2" rx="1" fill={ORANGE} opacity="0.6" />
                        <rect x="30" y="28" width="2" height="16" rx="1" fill={ORANGE} opacity="0.6" />
                        <rect x="154" y="170" width="16" height="2" rx="1" fill={ORANGE} opacity="0.6" />
                        <rect x="168" y="154" width="2" height="16" rx="1" fill={ORANGE} opacity="0.6" />
                    </svg>

                    {/* orbit nodes */}
                    {[
                        { angle: -90, label: 'HPDC' },
                        { angle:  30, label: 'GDC'  },
                        { angle: 150, label: 'LPDC' },
                    ].map(({ angle, label }, i) => {
                        const rad = (angle * Math.PI) / 180;
                        const R   = 108;
                        const cx  = 50 + R * Math.cos(rad);
                        const cy  = 50 + R * Math.sin(rad);
                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                left: `${cx}%`, top: `${cy}%`,
                                transform: 'translate(-50%,-50%)',
                                width: 44, height: 44, borderRadius: '50%',
                                background: NAVY, border: `1.5px solid ${ORANGE}`,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: 8, fontWeight: 800, color: ORANGE,
                                animation: `castingPulse ${1.8 + i * 0.4}s ease-in-out infinite`,
                                animationDelay: `${i * 0.3}s`,
                                boxShadow: `0 0 12px ${ORANGE}33`,
                                zIndex: 2,
                            }}>
                                {label}
                            </div>
                        );
                    })}
                </div>

                {/* tagline */}
                <div style={styles.tagline}>
                    <span style={styles.tagDot} />
                    Precision Aluminum Die Casting
                    <span style={styles.tagDot} />
                </div>

                {/* progress bar */}
                <div style={styles.progressWrap}>
                    <div style={{ ...styles.progressBar, width: `${clamp(progress)}%` }} />
                    <div style={styles.progressGlow} />
                </div>

                {/* progress text */}
                <div style={styles.progressText}>
                    {progress < 100
                        ? <><span style={{ color: ORANGE, fontWeight: 800 }}>{Math.min(100, Math.floor(progress))}%</span> &nbsp; Initializing...</>
                        : <span style={{ color: ORANGE, animation: 'textBlink 0.6s 3' }}>Ready</span>
                    }
                </div>

                {/* process steps */}
                <div style={styles.steps}>
                    {[
                        { icon: 'icofont-gears',       label: 'Die Casting'    },
                        { icon: 'icofont-checked',      label: 'Quality Check'  },
                        { icon: 'icofont-delivery-time',label: 'Supply Chain'   },
                    ].map((s, i) => (
                        <div key={i} style={{
                            ...styles.step,
                            opacity: progress > (i + 1) * 28 ? 1 : 0.25,
                            transform: progress > (i + 1) * 28 ? 'translateY(0)' : 'translateY(6px)',
                            transition: 'all 0.4s ease',
                        }}>
                            <i className={s.icon} style={styles.stepIcon} />
                            <span style={styles.stepLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay:      { position: 'fixed', inset: 0, background: `linear-gradient(135deg, ${DEEP} 0%, ${NAVY} 100%)`, zIndex: 9999999, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    grid:         { position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(245,91,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,91,20,0.04) 1px, transparent 1px)`, backgroundSize: '48px 48px' },

    center:       { position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, animation: 'fadeIn 0.5s ease' },

    hexWrap:      { position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
    ring:         { position: 'absolute', borderRadius: '50%', border: `1px dashed ${ORANGE}30`, animation: 'hexSpin linear infinite' },
    ringR:        { position: 'absolute', borderRadius: '50%', border: `1px dashed ${ORANGE}20`, animation: 'hexSpinR linear infinite' },
    svg:          { width: 160, height: 160, position: 'relative', zIndex: 1 },

    tagline:      { display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 20 },
    tagDot:       { width: 4, height: 4, borderRadius: '50%', background: ORANGE, display: 'inline-block' },

    progressWrap: { width: 280, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden', position: 'relative', marginBottom: 12 },
    progressBar:  { height: '100%', background: `linear-gradient(90deg, ${ORANGE}, #ff8c5a)`, borderRadius: 4, transition: 'width 0.1s linear', boxShadow: `0 0 10px ${ORANGE}88` },
    progressGlow: { position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent, ${ORANGE}22, transparent)`, animation: 'scanLine 1.5s linear infinite' },

    progressText: { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28, letterSpacing: 1 },

    steps:        { display: 'flex', gap: 24 },
    step:         { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
    stepIcon:     { fontSize: 18, color: ORANGE },
    stepLabel:    { fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 0.5 },
};

export default PreLoader;