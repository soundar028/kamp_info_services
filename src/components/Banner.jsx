import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ORANGE = '#f55b14';
const NAVY   = '#131e3c';
const DEEP   = '#0b1120';

const SLIDES = [
    {
        id: 1,
        tag:     'Die Casting Experts',
        title:   ['Precision Aluminum', 'Die Casting', 'Solutions'],
        accent:  2, // index of the accented word
        text:    'Specialized sourcing of machined aluminum castings using HPDC, GDC, and LPDC processes for automotive and industrial applications.',
        btn1:    { label: 'Our Services',  to: '/service'  },
        btn2:    { label: 'Contact Us',    to: '/contact'  },
        stats:   [{ v:'200+', l:'Verified Suppliers' }, { v:'10+', l:'Years Experience' }, { v:'98%', l:'Client Satisfaction' }],
    },
    {
        id: 2,
        tag:     'Strategic Procurement',
        title:   ['Transforming', 'Procurement', 'into Advantage'],
        accent:  1,
        text:    'Connect with verified suppliers and streamline negotiations with real-time insights to cut costs and speed up decision-making.',
        btn1:    { label: 'Explore Services', to: '/service' },
        btn2:    { label: 'Enquire Now',      to: '/contact' },
        stats:   [{ v:'Pan-India', l:'Supplier Network' }, { v:'HPDC/GDC', l:'Casting Expertise' }, { v:'End-to-End', l:'Supply Chain' }],
    },
];

/* ── Particle canvas ── */
const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');
        let raf;

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const COUNT = 55;
        const particles = Array.from({ length: COUNT }, () => ({
            x:  Math.random() * canvas.width,
            y:  Math.random() * canvas.height,
            r:  Math.random() * 1.8 + 0.4,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            o:  Math.random() * 0.5 + 0.15,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // connections
            for (let i = 0; i < COUNT; i++) {
                for (let j = i + 1; j < COUNT; j++) {
                    const dx   = particles[i].x - particles[j].x;
                    const dy   = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(245,91,20,${0.12 * (1 - dist / 130)})`;
                        ctx.lineWidth   = 0.6;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // dots
            particles.forEach(p => {
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height)  p.dy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245,91,20,${p.o})`;
                ctx.fill();
            });

            raf = requestAnimationFrame(draw);
        };
        draw();

        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    }, []);

    return <canvas ref={canvasRef} style={styles.canvas} />;
};

/* ── Typewriter ── */
const Typewriter = ({ words }) => {
    const [idx, setIdx]   = useState(0);
    const [text, setText] = useState('');
    const [del, setDel]   = useState(false);

    useEffect(() => {
        const word    = words[idx % words.length];
        const timeout = del
            ? setTimeout(() => {
                setText(t => t.slice(0, -1));
                if (text.length === 1) { setDel(false); setIdx(i => i + 1); }
              }, 60)
            : setTimeout(() => {
                setText(word.slice(0, text.length + 1));
                if (text === word) setTimeout(() => setDel(true), 1600);
              }, 90);
        return () => clearTimeout(timeout);
    }, [text, del, idx, words]);

    return (
        <span style={styles.typewriter}>
            {text}<span style={styles.cursor}>|</span>
        </span>
    );
};

/* ── Main Banner ── */
const Banner = () => {
    const [active, setActive]   = useState(0);
    const [visible, setVisible] = useState(true);
    const timerRef              = useRef(null);

    const goTo = (i) => {
        setVisible(false);
        setTimeout(() => { setActive(i); setVisible(true); }, 350);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setActive(a => (a + 1) % SLIDES.length);
                setVisible(true);
            }, 350);
        }, 6000);
        return () => clearInterval(timerRef.current);
    }, []);

    const slide = SLIDES[active];

    return (
        <section style={styles.section}>
            {/* Dark gradient background */}
            <div style={styles.bgBase} />

            {/* Animated gradient orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />
            <div style={styles.orb3} />

            {/* Grid overlay */}
            <div style={styles.grid} />

            {/* Particle network */}
            <ParticleCanvas />

            {/* Content */}
            <div style={styles.wrapper}>
                <div style={styles.left}>

                    {/* Tag */}
                    <div style={{ ...styles.fadeBlock, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0ms' }}>
                        <div style={styles.tag}>
                            <span style={styles.tagDot} />
                            {slide.tag}
                        </div>
                    </div>

                    {/* Title */}
                    <div style={{ ...styles.fadeBlock, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '80ms' }}>
                        <h1 style={styles.title}>
                            {slide.title.map((word, i) =>
                                i === slide.accent
                                    ? <span key={i} style={styles.titleAccent}>{word}<br /></span>
                                    : <span key={i}>{word}<br /></span>
                            )}
                        </h1>
                    </div>

                    {/* Typewriter */}
                    <div style={{ ...styles.fadeBlock, opacity: visible ? 1 : 0, transitionDelay: '160ms' }}>
                        <Typewriter words={['HPDC Sourcing', 'GDC Expertise', 'LPDC Solutions', 'Supply Chain Management', 'Supplier Selection']} />
                    </div>

                    {/* Description */}
                    <div style={{ ...styles.fadeBlock, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '240ms' }}>
                        <p style={styles.desc}>{slide.text}</p>
                    </div>

                    {/* Buttons */}
                    <div style={{ ...styles.fadeBlock, ...styles.btnRow, opacity: visible ? 1 : 0, transitionDelay: '320ms' }}>
                        <Link to={slide.btn1.to} style={styles.btnPrimary}
                            onMouseEnter={e => e.currentTarget.style.background = '#d94d0e'}
                            onMouseLeave={e => e.currentTarget.style.background = ORANGE}>
                            {slide.btn1.label}
                            <i className="icofont-long-arrow-right" style={{ marginLeft: 10 }} />
                        </Link>
                        <Link to={slide.btn2.to} style={styles.btnOutline}
                            onMouseEnter={e => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}>
                            {slide.btn2.label}
                        </Link>
                    </div>

                    {/* Stats */}
                    <div style={{ ...styles.fadeBlock, ...styles.statsRow, opacity: visible ? 1 : 0, transitionDelay: '400ms' }}>
                        {slide.stats.map((s, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <div style={styles.statDivider} />}
                                <div style={styles.stat}>
                                    <div style={styles.statValue}>{s.v}</div>
                                    <div style={styles.statLabel}>{s.l}</div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Right — Animated SVG illustration */}
                <div style={{ ...styles.right, opacity: visible ? 1 : 0, transform: visible ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.96)', transition: 'all 0.5s ease' }}>
                    <div style={styles.illustrationWrap}>

                        {/* Rotating ring */}
                        <div style={styles.ringOuter} />
                        <div style={styles.ringInner} />

                        {/* Center hex */}
                        <svg viewBox="0 0 360 360" style={styles.hexSvg} xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <radialGradient id="hg" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor={ORANGE} stopOpacity="0.25" />
                                    <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
                                </radialGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="blur"/>
                                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                                </filter>
                            </defs>

                            {/* Outer hex ring */}
                            <polygon points="180,30 310,105 310,255 180,330 50,255 50,105"
                                fill="none" stroke={ORANGE} strokeWidth="1" opacity="0.2" />
                            <polygon points="180,60 285,117 285,243 180,300 75,243 75,117"
                                fill="none" stroke={ORANGE} strokeWidth="0.8" opacity="0.15" />

                            {/* Center circle */}
                            <circle cx="180" cy="180" r="80" fill="url(#hg)" />
                            <circle cx="180" cy="180" r="80" fill="none" stroke={ORANGE} strokeWidth="1.5" opacity="0.5" />

                            {/* Inner content */}
                            <text x="180" y="165" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" letterSpacing="2" opacity="0.9">KAMP</text>
                            <text x="180" y="185" textAnchor="middle" fill={ORANGE} fontSize="9" fontWeight="600" letterSpacing="1.5" opacity="0.9">INFO SERVICES</text>

                            {/* Orbit nodes */}
                            {[
                                { angle: -90, label: 'HPDC',   sub: 'High Pressure'  },
                                { angle: -18, label: 'GDC',    sub: 'Gravity Cast'   },
                                { angle:  54, label: 'LPDC',   sub: 'Low Pressure'   },
                                { angle: 126, label: 'SCM',    sub: 'Supply Chain'   },
                                { angle: 198, label: 'SOURCE', sub: 'Pan-India'      },
                            ].map(({ angle, label, sub }, i) => {
                                const rad = (angle * Math.PI) / 180;
                                const R   = 138;
                                const cx  = 180 + R * Math.cos(rad);
                                const cy  = 180 + R * Math.sin(rad);
                                return (
                                    <g key={i} filter="url(#glow)">
                                        <line x1="180" y1="180" x2={cx} y2={cy}
                                            stroke={ORANGE} strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
                                        <circle cx={cx} cy={cy} r="28" fill={NAVY} stroke={ORANGE} strokeWidth="1.2" />
                                        <circle cx={cx} cy={cy} r="20" fill={ORANGE} opacity="0.12" />
                                        <text x={cx} y={cy - 3} textAnchor="middle" fill={ORANGE} fontSize="8" fontWeight="800">{label}</text>
                                        <text x={cx} y={cy + 9} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6">{sub}</text>
                                    </g>
                                );
                            })}

                            {/* Corner accent marks */}
                            <rect x="30" y="30" width="30" height="3" rx="1.5" fill={ORANGE} opacity="0.6" />
                            <rect x="30" y="30" width="3" height="30" rx="1.5" fill={ORANGE} opacity="0.6" />
                            <rect x="300" y="327" width="30" height="3" rx="1.5" fill={ORANGE} opacity="0.6" />
                            <rect x="327" y="300" width="3" height="30" rx="1.5" fill={ORANGE} opacity="0.6" />
                        </svg>

                        {/* Floating chips */}
                        {[
                            { top: '8%',  left: '60%', label: 'Aluminum Casting', icon: 'icofont-gears'       },
                            { top: '78%', left: '55%', label: 'Pan-India Network',icon: 'icofont-google-map'  },
                            { top: '42%', left: '3%',  label: 'Verified Vendors', icon: 'icofont-checked'     },
                        ].map((chip, i) => (
                            <div key={i} style={{ ...styles.chip, top: chip.top, left: chip.left }}>
                                <i className={chip.icon} style={styles.chipIcon} />
                                <span style={styles.chipLabel}>{chip.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Slide dots */}
            <div style={styles.dots}>
                {SLIDES.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} style={{ ...styles.dot, ...(i === active ? styles.dotActive : {}) }} />
                ))}
            </div>

            {/* Bottom wave */}
            <div style={styles.wave}>
                <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: '100%', height: 70, display: 'block' }}>
                    <path d="M0,35 C360,70 720,0 1080,35 C1260,52 1360,28 1440,35 L1440,70 L0,70 Z" fill="#f7f8fc" />
                </svg>
            </div>
        </section>
    );
};

/* ── CSS-in-JS keyframes injected once ── */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-30px) scale(1.1)} }
  @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(1.08)} }
  @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)}          50%{transform:translate(20px,20px)} }
  @keyframes ringRotate { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
  @keyframes ringRotateR { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }
  @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeSlide { opacity: 1; transform: translateY(0); }
`;
if (!document.head.querySelector('#banner-styles')) {
    styleTag.id = 'banner-styles';
    document.head.appendChild(styleTag);
}

const styles = {
    section:  { position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    bgBase:   { position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${DEEP} 0%, ${NAVY} 60%, #1a1040 100%)`, zIndex: 0 },
    orb1:     { position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${ORANGE}28 0%, transparent 65%)`, zIndex: 1, animation: 'orbFloat1 8s ease-in-out infinite' },
    orb2:     { position: 'absolute', bottom: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, #3b1c8c22 0%, transparent 65%)`, zIndex: 1, animation: 'orbFloat2 10s ease-in-out infinite' },
    orb3:     { position: 'absolute', top: '40%', left: '35%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${ORANGE}12 0%, transparent 70%)`, zIndex: 1, animation: 'orbFloat3 6s ease-in-out infinite' },
    grid:     { position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(245,91,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,91,20,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px', zIndex: 1 },
    canvas:   { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 },
    wrapper:  { position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', padding: '120px 32px 100px', gap: 48, flex: 1, width: '100%', boxSizing: 'border-box' },
    left:     { flex: '1 1 520px', maxWidth: 580 },
    right:    { flex: '1 1 400px', maxWidth: 480, transition: 'all 0.5s ease' },

    fadeBlock: { transition: 'opacity 0.45s ease, transform 0.45s ease' },

    tag:      { display: 'inline-flex', alignItems: 'center', gap: 8, background: `${ORANGE}18`, border: `1px solid ${ORANGE}40`, borderRadius: 50, padding: '6px 16px', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 20 },
    tagDot:   { width: 6, height: 6, borderRadius: '50%', background: ORANGE, boxShadow: `0 0 8px ${ORANGE}` },

    title:       { fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 16, letterSpacing: -1 },
    titleAccent: { color: ORANGE, display: 'inline' },

    typewriter: { fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginBottom: 20, display: 'block', letterSpacing: 0.5 },
    cursor:     { color: ORANGE, animation: 'cursorBlink 0.8s step-end infinite', marginLeft: 2 },

    desc:     { fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 32, maxWidth: 500 },

    btnRow:      { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 },
    btnPrimary:  { display: 'inline-flex', alignItems: 'center', background: ORANGE, color: '#fff', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'background 0.2s', boxShadow: `0 8px 28px ${ORANGE}44` },
    btnOutline:  { display: 'inline-flex', alignItems: 'center', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'all 0.2s' },

    statsRow:   { display: 'flex', alignItems: 'center', gap: 0 },
    stat:       { textAlign: 'center', padding: '0 24px' },
    statDivider:{ width: 1, height: 40, background: 'rgba(255,255,255,0.12)' },
    statValue:  { fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 },
    statLabel:  { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4, letterSpacing: 0.3 },

    /* Illustration */
    illustrationWrap: { position: 'relative', width: '100%', aspectRatio: '1', maxWidth: 440, margin: '0 auto' },
    ringOuter: { position: 'absolute', top: '50%', left: '50%', width: '90%', height: '90%', borderRadius: '50%', border: `1px dashed ${ORANGE}30`, transform: 'translate(-50%,-50%)', animation: 'ringRotate 18s linear infinite' },
    ringInner: { position: 'absolute', top: '50%', left: '50%', width: '70%', height: '70%', borderRadius: '50%', border: `1px dashed ${ORANGE}20`, transform: 'translate(-50%,-50%)', animation: 'ringRotateR 12s linear infinite' },
    hexSvg:    { width: '100%', height: '100%', position: 'relative', zIndex: 2 },

    chip:      { position: 'absolute', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 50, padding: '8px 14px', zIndex: 5 },
    chipIcon:  { color: ORANGE, fontSize: 14 },
    chipLabel: { fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' },

    /* Dots */
    dots:     { position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', gap: 10, paddingBottom: 70 },
    dot:      { width: 8, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' },
    dotActive:{ width: 28, background: ORANGE },

    wave:     { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 6 },
};

export default Banner;