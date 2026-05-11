import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '/img/logo/ft-logo.png';

const ORANGE = '#f55b14';
const NAVY   = '#131e3c';
const DEEP   = '#0b1120';

const serviceLinks = [
    { label: 'Supplier Selection',        slug: 'supplier-selection'            },
    { label: 'Enquiry Handling',          slug: 'rfq-rfi-nda-management'        },
    { label: 'Negotiations & Closure',    slug: 'negotiations-commercial-closure'},
    { label: 'Supply Chain Management',   slug: 'supply-chain-management'       },
    { label: 'Sourcing: HPDC/GDC/LPDC',  slug: 'die-casting-sourcing'          },
];

const quickLinks = [
    { label: 'Home',        to: '/'        },
    { label: 'About Us',    to: '/about'   },
    { label: 'Services',    to: '/service' },
    { label: 'Contact Us',  to: '/contact' },
];

const socials = [
    { icon: 'icofont-facebook',  href: 'https://facebook.com',  color: '#1877f2' },
    { icon: 'icofont-twitter',   href: 'https://twitter.com',   color: '#1da1f2' },
    { icon: 'icofont-linkedin',  href: 'https://linkedin.com',  color: '#0a66c2' },
    { icon: 'icofont-whatsapp',  href: 'https://wa.me/918220653952', color: '#25d366' },
];

const Footer = () => {
    const [hoveredService, setHoveredService] = useState(null);
    const [hoveredQuick,   setHoveredQuick]   = useState(null);
    const [hoveredSocial,  setHoveredSocial]  = useState(null);

    return (
        <footer style={styles.footer}>

            {/* Top wave */}
            <div style={styles.waveTop}>
                <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: '100%', height: 70, display: 'block' }}>
                    <path d="M0,35 C360,0 720,70 1080,35 C1260,18 1360,50 1440,35 L1440,0 L0,0 Z" fill="#f7f8fc" />
                </svg>
            </div>

            {/* Decorative orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />
            <div style={styles.gridOverlay} />

            {/* ── CTA Strip ── */}
            <div style={styles.ctaStrip}>
                <div style={styles.ctaInner}>
                    <div style={styles.ctaLeft}>
                        <div style={styles.ctaTag}>
                            <span style={styles.ctaDot} />
                            Ready to Partner With Us?
                        </div>
                        <h2 style={styles.ctaTitle}>Let's Transform Your Procurement Together</h2>
                    </div>
                    <Link
                        to="/contact"
                        style={styles.ctaBtn}
                        onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = ORANGE; }}
                        onMouseLeave={e => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.color = '#fff'; }}
                    >
                        Get in Touch
                        <i className="icofont-long-arrow-right" style={{ marginLeft: 10 }} />
                    </Link>
                </div>
            </div>

            {/* ── Main Footer Body ── */}
            <div style={styles.body}>
                <div style={styles.container}>
                    <div style={styles.grid4}>

                        {/* Col 1 — Brand */}
                        <div style={styles.col}>
                            <img src={footerLogo} alt="KAMP Info Services" style={styles.logo}
                                onError={e => { e.target.style.display = 'none'; }} />
                            <p style={styles.about}>
                                KAMP Info Services transforms procurement into a strategic advantage.
                                We connect businesses with verified suppliers for precision machined
                                aluminum castings across India.
                            </p>

                            {/* Stats mini */}
                            <div style={styles.miniStats}>
                                {[
                                    { v: '200+', l: 'Suppliers' },
                                    { v: '10+',  l: 'Years'     },
                                    { v: '98%',  l: 'Satisfied' },
                                ].map((s, i) => (
                                    <div key={i} style={styles.miniStat}>
                                        <div style={styles.miniStatVal}>{s.v}</div>
                                        <div style={styles.miniStatLbl}>{s.l}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Socials */}
                            <div style={styles.socialsRow}>
                                {socials.map((s, i) => (
                                    <a key={i} href={s.href} target="_blank" rel="noreferrer"
                                        style={{
                                            ...styles.socialBtn,
                                            ...(hoveredSocial === i ? { background: s.color, borderColor: s.color, transform: 'translateY(-3px)' } : {})
                                        }}
                                        onMouseEnter={() => setHoveredSocial(i)}
                                        onMouseLeave={() => setHoveredSocial(null)}
                                    >
                                        <i className={s.icon} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Col 2 — Quick Links */}
                        <div style={styles.col}>
                            <div style={styles.colHeader}>
                                <div style={styles.colAccent} />
                                <h3 style={styles.colTitle}>Quick Links</h3>
                            </div>
                            <ul style={styles.linkList}>
                                {quickLinks.map((l, i) => (
                                    <li key={i} style={styles.linkItem}>
                                        <Link
                                            to={l.to}
                                            style={{
                                                ...styles.linkAnchor,
                                                ...(hoveredQuick === i ? { color: ORANGE, paddingLeft: 14 } : {})
                                            }}
                                            onMouseEnter={() => setHoveredQuick(i)}
                                            onMouseLeave={() => setHoveredQuick(null)}
                                        >
                                            <i className="icofont-rounded-double-right" style={{ ...styles.linkArrow, ...(hoveredQuick === i ? { color: ORANGE } : {}) }} />
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 3 — Our Solutions */}
                        <div style={styles.col}>
                            <div style={styles.colHeader}>
                                <div style={styles.colAccent} />
                                <h3 style={styles.colTitle}>Our Solutions</h3>
                            </div>
                            <ul style={styles.linkList}>
                                {serviceLinks.map(({ label, slug }, i) => (
                                    <li key={slug} style={styles.linkItem}>
                                        <Link
                                            to="/service-details"
                                            state={{ slug }}
                                            style={{
                                                ...styles.linkAnchor,
                                                ...(hoveredService === i ? { color: ORANGE, paddingLeft: 14 } : {})
                                            }}
                                            onMouseEnter={() => setHoveredService(i)}
                                            onMouseLeave={() => setHoveredService(null)}
                                        >
                                            <i className="icofont-rounded-double-right" style={{ ...styles.linkArrow, ...(hoveredService === i ? { color: ORANGE } : {}) }} />
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 4 — Contact */}
                        <div style={styles.col}>
                            <div style={styles.colHeader}>
                                <div style={styles.colAccent} />
                                <h3 style={styles.colTitle}>Contact Info</h3>
                            </div>
                            <div style={styles.contactList}>
                                {[
                                    {
                                        icon: 'icofont-google-map',
                                        content: <span>520, Srisai Murali, V.K.V Nagar,<br />N.G.G.O Colony, Thudiyalur,<br />Coimbatore - 641021</span>
                                    },
                                    {
                                        icon: 'icofont-email',
                                        content: <a href="mailto:info@kampinfoservices.com" style={styles.contactLink}>info@kampinfoservices.com</a>
                                    },
                                    {
                                        icon: 'icofont-telephone',
                                        content: <a href="tel:+918220653952" style={styles.contactLink}>+91 82206 53952</a>
                                    },
                                ].map((item, i) => (
                                    <div key={i} style={styles.contactRow}>
                                        <div style={styles.contactIconWrap}>
                                            <i className={item.icon} style={styles.contactIcon} />
                                        </div>
                                        <div style={styles.contactText}>{item.content}</div>
                                    </div>
                                ))}

                                {/* Map embed hint */}
                                <div style={styles.mapBox}>
                                    <i className="icofont-location-pin" style={{ color: ORANGE, marginRight: 8 }} />
                                    <a
                                        href="https://maps.google.com/?q=Thudiyalur,Coimbatore"
                                        target="_blank" rel="noreferrer"
                                        style={{ color: ORANGE, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                                    >
                                        View on Google Maps →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div style={styles.bottomBar}>
                <div style={styles.container}>
                    <div style={styles.bottomInner}>
                        <span style={styles.copyright}>
                            © {new Date().getFullYear()} <span style={{ color: ORANGE }}>KAMP Info Services</span>. All rights reserved.
                        </span>
                        <div style={styles.bottomLinks}>
                            <span style={styles.devCredit}>
                                Designed by{' '}
                                <a href="#" style={{ color: ORANGE, textDecoration: 'none', fontWeight: 600 }}>
                                    Ero Edge Technologies
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer:      { position: 'relative', background: `linear-gradient(160deg, ${DEEP} 0%, ${NAVY} 100%)`, overflow: 'hidden' },
    waveTop:     { lineHeight: 0, marginBottom: -2 },
    orb1:        { position: 'absolute', top: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${ORANGE}12 0%, transparent 65%)`, pointerEvents: 'none' },
    orb2:        { position: 'absolute', bottom: '10%', left: '-8%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, #3b1c8c18 0%, transparent 65%)`, pointerEvents: 'none' },
    gridOverlay: { position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(245,91,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,91,20,0.03) 1px, transparent 1px)`, backgroundSize: '50px 50px', pointerEvents: 'none' },

    /* CTA Strip */
    ctaStrip:  { position: 'relative', zIndex: 2, borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '40px 0' },
    ctaInner:  { maxWidth: 1160, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' },
    ctaLeft:   {},
    ctaTag:    { display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 8 },
    ctaDot:    { width: 6, height: 6, borderRadius: '50%', background: ORANGE, display: 'inline-block', boxShadow: `0 0 8px ${ORANGE}` },
    ctaTitle:  { fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.3 },
    ctaBtn:    { display: 'inline-flex', alignItems: 'center', background: ORANGE, color: '#fff', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'all 0.2s ease', whiteSpace: 'nowrap', boxShadow: `0 8px 28px ${ORANGE}44`, flexShrink: 0 },

    /* Body */
    body:      { position: 'relative', zIndex: 2, padding: '64px 0 40px' },
    container: { maxWidth: 1160, margin: '0 auto', padding: '0 32px' },
    grid4:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 48 },
    col:       {},

    /* Brand col */
    logo:      { height: 44, marginBottom: 20 },
    about:     { fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 24 },

    miniStats:    { display: 'flex', gap: 0, marginBottom: 24, background: 'rgba(255,255,255,0.04)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' },
    miniStat:     { flex: 1, textAlign: 'center', padding: '14px 8px', borderRight: '1px solid rgba(255,255,255,0.06)' },
    miniStatVal:  { fontSize: 18, fontWeight: 800, color: '#fff' },
    miniStatLbl:  { fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5, marginTop: 2 },

    socialsRow:   { display: 'flex', gap: 10 },
    socialBtn:    { width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, textDecoration: 'none', transition: 'all 0.25s ease', cursor: 'pointer' },

    /* Col headers */
    colHeader:    { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 },
    colAccent:    { width: 4, height: 20, borderRadius: 2, background: ORANGE, flexShrink: 0 },
    colTitle:     { fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: 1 },

    /* Links */
    linkList:     { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 },
    linkItem:     {},
    linkAnchor:   { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', padding: '7px 0 7px 0', transition: 'all 0.2s ease', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingLeft: 0 },
    linkArrow:    { fontSize: 11, color: 'rgba(255,255,255,0.25)', transition: 'color 0.2s', flexShrink: 0 },

    /* Contact */
    contactList:  { display: 'flex', flexDirection: 'column', gap: 16 },
    contactRow:   { display: 'flex', alignItems: 'flex-start', gap: 14 },
    contactIconWrap: { width: 36, height: 36, borderRadius: 8, background: `${ORANGE}18`, border: `1px solid ${ORANGE}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    contactIcon:  { color: ORANGE, fontSize: 16 },
    contactText:  { fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 },
    contactLink:  { color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s', fontSize: 13 },
    mapBox:       { display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.06)', marginTop: 4 },

    /* Bottom bar */
    bottomBar:    { position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.07)', padding: '20px 0' },
    bottomInner:  { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
    copyright:    { fontSize: 13, color: 'rgba(255,255,255,0.35)' },
    bottomLinks:  { display: 'flex', alignItems: 'center', gap: 20 },
    devCredit:    { fontSize: 13, color: 'rgba(255,255,255,0.35)' },
};

export default Footer;