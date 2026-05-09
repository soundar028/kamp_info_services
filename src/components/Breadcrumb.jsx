import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ORANGE = '#f55b14';
const NAVY   = '#131e3c';
const DEEP   = '#0f1934';

const Breadcrumb = ({ pageTitle }) => {
    const title = pageTitle || '404 Error Page';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setScrolled(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <section style={styles.section}>
            {/* Background layers */}
            <div style={styles.bgGradient}></div>
            <div style={styles.bgPattern}></div>

            {/* Animated accent bars */}
            <div style={styles.accentBarLeft}></div>
            <div style={styles.accentBarRight}></div>

            {/* Floating decorative circles */}
            <div style={styles.circleTopRight}></div>
            <div style={styles.circleBottomLeft}></div>
            <div style={styles.circleMid}></div>

            <div style={styles.container}>
                <div style={{
                    ...styles.content,
                    opacity: scrolled ? 1 : 0,
                    transform: scrolled ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}>
                    {/* Page label */}
                    <div style={styles.label}>
                        <span style={styles.labelDot}></span>
                        KAMP Info Services
                        <span style={styles.labelDot}></span>
                    </div>

                    {/* Page Title */}
                    <h1 style={styles.title}>
                        {title.split(' ').map((word, i, arr) =>
                            i === arr.length - 1
                                ? <span key={i} style={styles.titleAccent}>{word}</span>
                                : <span key={i}>{word} </span>
                        )}
                    </h1>

                    {/* Divider */}
                    <div style={styles.dividerRow}>
                        <div style={styles.dividerLine}></div>
                        <div style={styles.dividerDiamond}></div>
                        <div style={styles.dividerLine}></div>
                    </div>

                    {/* Breadcrumb trail */}
                    <nav style={styles.breadcrumbNav}>
                        <div style={styles.breadcrumbPill}>
                            <Link
                                to="/"
                                style={styles.crumbHome}
                                onMouseEnter={e => e.target.style.color = ORANGE}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
                            >
                                <i className="icofont-home" style={{ marginRight: 6, fontSize: 13 }}></i>
                                Home
                            </Link>
                            <span style={styles.crumbSeparator}>
                                <i className="icofont-rounded-double-right"></i>
                            </span>
                            <span style={styles.crumbCurrent}>{title}</span>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Bottom wave */}
            <div style={styles.waveWrap}>
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={styles.waveSvg}>
                    <path
                        d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
                        fill="#f7f8fc"
                    />
                </svg>
            </div>
        </section>
    );
};

const styles = {
    section: {
        position: 'relative',
        minHeight: 280,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 40,
        paddingBottom: 60,
    },

    /* BG layers */
    bgGradient: {
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${DEEP} 0%, ${NAVY} 50%, ${ORANGE}cc 100%)`,
        zIndex: 1,
    },
    bgPattern: {
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        zIndex: 2,
    },

    /* Accent bars */
    accentBarLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
        background: `linear-gradient(180deg, ${ORANGE}, transparent)`,
        zIndex: 3,
    },
    accentBarRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 2,
        height: '60%',
        background: `linear-gradient(180deg, transparent, ${ORANGE}88)`,
        zIndex: 3,
    },

    /* Floating circles */
    circleTopRight: {
        position: 'absolute',
        top: -60,
        right: -60,
        width: 280,
        height: 280,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${ORANGE}33 0%, transparent 70%)`,
        zIndex: 2,
    },
    circleBottomLeft: {
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 320,
        height: 320,
        borderRadius: '50%',
        border: `1px solid ${ORANGE}22`,
        zIndex: 2,
    },
    circleMid: {
        position: 'absolute',
        top: '50%',
        left: '55%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: `1px solid rgba(255,255,255,0.05)`,
        zIndex: 2,
    },

    /* Content */
    container: {
        maxWidth: 1160,
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        position: 'relative',
        zIndex: 10,
    },
    content: {
        textAlign: 'center',
    },

    /* Label */
    label: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.6)',
        marginBottom: 16,
    },
    labelDot: {
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: ORANGE,
        display: 'inline-block',
    },

    /* Title */
    title: {
        fontSize: 52,
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1.1,
        marginBottom: 20,
        letterSpacing: -0.5,
        textShadow: '0 4px 24px rgba(0,0,0,0.3)',
    },
    titleAccent: {
        color: ORANGE,
        position: 'relative',
    },

    /* Divider */
    dividerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 24,
    },
    dividerLine: {
        width: 60,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${ORANGE}88, transparent)`,
    },
    dividerDiamond: {
        width: 8,
        height: 8,
        background: ORANGE,
        transform: 'rotate(45deg)',
    },

    /* Breadcrumb */
    breadcrumbNav: {
        display: 'flex',
        justifyContent: 'center',
    },
    breadcrumbPill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 50,
        padding: '10px 24px',
    },
    crumbHome: {
        fontSize: 13,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.85)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s',
    },
    crumbSeparator: {
        color: ORANGE,
        fontSize: 11,
        display: 'flex',
        alignItems: 'center',
    },
    crumbCurrent: {
        fontSize: 13,
        fontWeight: 700,
        color: ORANGE,
    },

    /* Wave */
    waveWrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        lineHeight: 0,
    },
    waveSvg: {
        width: '100%',
        height: 60,
        display: 'block',
    },
};

export default Breadcrumb;