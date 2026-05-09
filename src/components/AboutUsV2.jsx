import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const ORANGE = '#f55b14';
const NAVY   = '#131e3c';
const DEEP   = '#0f1934';

const AboutUsV2 = () => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimated(true), 200);
        return () => clearTimeout(t);
    }, []);

    const stats = [
        { value: '200+', label: 'Verified Suppliers', icon: 'icofont-checked' },
        { value: '10+',  label: 'Years Experience',   icon: 'icofont-clock-time' },
        { value: '98%',  label: 'Client Satisfaction',icon: 'icofont-star' },
    ];

    return (
        <section className="about-us-sec pt-100 pb-100">
            <div className="container">
                <div className="row align-items-center">

                    {/* Left: Text */}
                    <div className="col-lg-6 col-md-12">
                        <div className="about-desc">
                            <div className="sec-title">
                                <h1>About KAMP Info Services</h1>
                            </div>
                            <p>
                                KAMP Info Services is a modern sourcing partner focused on transforming
                                procurement into a strategic advantage. We specialize in sourcing
                                machined aluminum castings for automotive and industrial applications
                                by connecting businesses with a network of verified and reliable suppliers.
                            </p>
                            <p>
                                Our expertise spans across High Pressure Die Casting (HPDC), Low Pressure
                                Die Casting (LPDC), and Gravity Die Casting (GDC), supported by strong
                                supplier partnerships across South India. We streamline the entire sourcing
                                process—from enquiry handling and negotiations to supply chain management—
                                ensuring cost efficiency, quality, and faster decision-making.
                            </p>

                            {/* Stats row */}
                            <div style={styles.statsRow}>
                                {stats.map((s, i) => (
                                    <div key={i} style={styles.statBox}>
                                        <i className={s.icon} style={styles.statIcon}></i>
                                        <div style={styles.statValue}>{s.value}</div>
                                        <div style={styles.statLabel}>{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="read-more-btn">
                                <Link to="/contact#">Contact Us</Link>
                            </div>
                        </div>
                    </div>

                    {/* Right: Illustration */}
                    <div className="col-lg-6 col-md-12">
                        <div style={styles.illustrationWrap}>

                            {/* Glow background */}
                            <div style={styles.glowCircle}></div>

                            {/* Main SVG Illustration */}
                            <svg
                                viewBox="0 0 520 480"
                                xmlns="http://www.w3.org/2000/svg"
                                style={styles.svg}
                            >
                                {/* ── Background card ── */}
                                <rect x="20" y="20" width="480" height="440" rx="24"
                                    fill={DEEP} opacity="0.97" />
                                <rect x="20" y="20" width="480" height="440" rx="24"
                                    fill="none" stroke={ORANGE} strokeWidth="1.5" opacity="0.25" />

                                {/* Grid dots pattern */}
                                {Array.from({ length: 8 }).map((_, row) =>
                                    Array.from({ length: 10 }).map((_, col) => (
                                        <circle key={`${row}-${col}`}
                                            cx={60 + col * 46} cy={50 + row * 52}
                                            r="1.2" fill="white" opacity="0.06" />
                                    ))
                                )}

                                {/* ── Central HEX (Factory) ── */}
                                <polygon points="260,130 300,108 340,130 340,174 300,196 260,174"
                                    fill={ORANGE} opacity="0.15" />
                                <polygon points="260,130 300,108 340,130 340,174 300,196 260,174"
                                    fill="none" stroke={ORANGE} strokeWidth="2" />
                                {/* Factory icon inside hex */}
                                <rect x="282" y="148" width="36" height="26" rx="3" fill={ORANGE} opacity="0.9"/>
                                <rect x="288" y="140" width="8" height="12" rx="2" fill={ORANGE}/>
                                <rect x="302" y="140" width="8" height="12" rx="2" fill={ORANGE}/>
                                <rect x="288" y="154" width="8" height="10" rx="1" fill={DEEP}/>
                                <rect x="302" y="154" width="8" height="10" rx="1" fill={DEEP}/>
                                <text x="300" y="210" textAnchor="middle"
                                    fill="white" fontSize="11" fontWeight="700" opacity="0.9">
                                    KAMP
                                </text>

                                {/* ── Orbit ring ── */}
                                <circle cx="300" cy="152" r="78"
                                    fill="none" stroke={ORANGE} strokeWidth="1"
                                    strokeDasharray="6 4" opacity="0.3"/>

                                {/* ── Supplier nodes (orbit) ── */}
                                {[
                                    { cx: 300, cy:  68, label: 'HPDC',    angle: -90 },
                                    { cx: 378, cy: 152, label: 'LPDC',    angle:   0 },
                                    { cx: 300, cy: 236, label: 'GDC',     angle:  90 },
                                    { cx: 222, cy: 152, label: 'Vendor',  angle: 180 },
                                ].map(({ cx, cy, label }, i) => (
                                    <g key={i}>
                                        <circle cx={cx} cy={cy} r="26"
                                            fill={NAVY} stroke={ORANGE} strokeWidth="1.5"/>
                                        <circle cx={cx} cy={cy} r="18"
                                            fill={ORANGE} opacity="0.15"/>
                                        <text x={cx} y={cy + 4} textAnchor="middle"
                                            fill={ORANGE} fontSize="9" fontWeight="800">
                                            {label}
                                        </text>
                                        {/* connector line to center */}
                                        <line
                                            x1={cx + (300 - cx) * 0.35}
                                            y1={cy + (152 - cy) * 0.35}
                                            x2={cx + (300 - cx) * 0.65}
                                            y2={cy + (152 - cy) * 0.65}
                                            stroke={ORANGE} strokeWidth="1" opacity="0.4"
                                            strokeDasharray="3 3"
                                        />
                                    </g>
                                ))}

                                {/* ── Bottom process flow ── */}
                                <rect x="40" y="268" width="440" height="2" rx="1"
                                    fill={ORANGE} opacity="0.12"/>

                                {/* Flow steps */}
                                {[
                                    { x: 68,  icon: '📋', label: 'Enquiry'   },
                                    { x: 163, icon: '🔍', label: 'Selection' },
                                    { x: 258, icon: '🤝', label: 'Negotiate' },
                                    { x: 353, icon: '🚚', label: 'Deliver'   },
                                    { x: 448, icon: '✅', label: 'Quality'   },
                                ].map(({ x, icon, label }, i) => (
                                    <g key={i}>
                                        {/* Arrow connector */}
                                        {i < 4 && (
                                            <path
                                                d={`M${x + 28},318 L${x + 68},318`}
                                                stroke={ORANGE} strokeWidth="1.5"
                                                strokeDasharray="4 3" opacity="0.5"
                                                markerEnd="url(#arrow)"
                                            />
                                        )}
                                        <circle cx={x} cy="318" r="26"
                                            fill={i % 2 === 0 ? ORANGE : NAVY}
                                            stroke={ORANGE} strokeWidth="1.5" opacity="0.95"/>
                                        <text x={x} y="322" textAnchor="middle" fontSize="14">
                                            {icon}
                                        </text>
                                        <text x={x} y="360" textAnchor="middle"
                                            fill="white" fontSize="9" opacity="0.75">
                                            {label}
                                        </text>
                                    </g>
                                ))}

                                {/* ── India map hint (abstract) ── */}
                                <text x="300" y="415" textAnchor="middle"
                                    fill="white" fontSize="10" opacity="0.35"
                                    fontWeight="600" letterSpacing="3">
                                    PAN-INDIA SUPPLIER NETWORK
                                </text>
                                <line x1="100" y1="420" x2="500" y2="420"
                                    stroke={ORANGE} strokeWidth="0.5" opacity="0.2"/>

                                {/* Arrow marker def */}
                                <defs>
                                    <marker id="arrow" markerWidth="6" markerHeight="6"
                                        refX="3" refY="3" orient="auto">
                                        <path d="M0,0 L6,3 L0,6 Z" fill={ORANGE} opacity="0.6"/>
                                    </marker>
                                </defs>

                                {/* ── Corner accent ── */}
                                <rect x="20" y="20" width="40" height="4" rx="2" fill={ORANGE}/>
                                <rect x="20" y="20" width="4" height="40" rx="2" fill={ORANGE}/>
                                <rect x="460" y="456" width="40" height="4" rx="2" fill={ORANGE}/>
                                <rect x="496" y="416" width="4" height="40" rx="2" fill={ORANGE}/>
                            </svg>

                            {/* Floating badge */}
                            <div style={styles.floatingBadge}>
                                <span style={styles.badgeDot}></span>
                                Trusted Sourcing Partner
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const styles = {
    statsRow: {
        display: 'flex',
        gap: 16,
        margin: '28px 0',
    },
    statBox: {
        flex: 1,
        background: '#f7f8fc',
        borderRadius: 12,
        padding: '16px 12px',
        textAlign: 'center',
        borderTop: `3px solid ${ORANGE}`,
    },
    statIcon: {
        fontSize: 20,
        color: ORANGE,
        display: 'block',
        marginBottom: 6,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 800,
        color: NAVY,
        lineHeight: 1,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: '#6b7280',
        fontWeight: 600,
        letterSpacing: 0.3,
    },
    illustrationWrap: {
        position: 'relative',
        padding: '20px 10px',
    },
    glowCircle: {
        position: 'absolute',
        top: '30%',
        left: '30%',
        width: 260,
        height: 260,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${ORANGE}22 0%, transparent 70%)`,
        pointerEvents: 'none',
    },
    svg: {
        width: '100%',
        height: 'auto',
        filter: 'drop-shadow(0 20px 60px rgba(19,30,60,0.18))',
        borderRadius: 24,
    },
    floatingBadge: {
        position: 'absolute',
        bottom: 32,
        left: -10,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: '#fff',
        borderRadius: 50,
        padding: '10px 20px',
        fontSize: 12,
        fontWeight: 700,
        color: NAVY,
        boxShadow: '0 8px 32px rgba(19,30,60,0.14)',
        border: `1.5px solid ${ORANGE}22`,
    },
    badgeDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: ORANGE,
        display: 'inline-block',
        boxShadow: `0 0 6px ${ORANGE}`,
    },
};

export default AboutUsV2;