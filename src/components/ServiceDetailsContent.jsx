import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { servicesData } from './servicesData';

const ServiceDetailsContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [relatedServices, setRelatedServices] = useState([]);
    const [activeFeature, setActiveFeature] = useState(null);

    useEffect(() => {
        const slug = location.state?.slug;
        const found = slug ? servicesData.find(s => s.slug === slug) : null;
        setService(found || null);
        setRelatedServices(
            found ? servicesData.filter(s => s.slug !== found.slug).slice(0, 2) : []
        );
        setActiveFeature(null);
        window.scrollTo(0, 0);
    }, [location.state]);

    const handleRelatedClick = (relatedSlug) => {
        navigate('/service-details', { state: { slug: relatedSlug } });
    };

    if (!service) {
        return (
            <section style={styles.emptySection}>
                <div style={styles.emptyBox}>
                    <i className="icofont-gears" style={styles.emptyIcon}></i>
                    <h2 style={styles.emptyTitle}>No Service Selected</h2>
                    <p style={styles.emptyText}>Please click on a service to view its details.</p>
                </div>
            </section>
        );
    }

    return (
        <section style={styles.section}>
            {/* Hero Banner */}
            <div style={styles.heroBanner}>
                <div style={styles.heroOverlay}></div>
                <img
                    src={service.image}
                    alt={service.title}
                    style={styles.heroImage}
                    onError={e => { e.target.style.display = 'none'; }}
                />
                <div style={styles.heroContent}>
                    <div style={styles.heroBadge}>
                        <i className="icofont-gears" style={{ marginRight: 8 }}></i>
                        Our Services
                    </div>
                    <h1 style={styles.heroTitle}>{service.title}</h1>
                    <div style={styles.heroDivider}></div>
                    <p style={styles.heroSubtitle}>{service.shortDescription}</p>
                </div>
            </div>

            <div style={styles.container}>

                {/* Description Card */}
                <div style={styles.descriptionCard}>
                    <div style={styles.descriptionAccent}></div>
                    <div style={styles.descriptionBody}>
                        <div style={styles.descriptionIconWrap}>
                            <i className="icofont-info-circle" style={styles.descriptionIcon}></i>
                        </div>
                        <div>
                            <h3 style={styles.descriptionLabel}>Overview</h3>
                            <p style={styles.descriptionText}>{service.description.trim()}</p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                {service.features?.length > 0 && (
                    <div style={styles.featuresSection}>
                        <div style={styles.sectionHeader}>
                            <span style={styles.sectionTag}>What's Included</span>
                            <h2 style={styles.sectionTitle}>Key Capabilities</h2>
                        </div>
                        <div style={styles.featuresGrid}>
                            {service.features.map((feature, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.featureCard,
                                        ...(activeFeature === index ? styles.featureCardActive : {})
                                    }}
                                    onMouseEnter={() => setActiveFeature(index)}
                                    onMouseLeave={() => setActiveFeature(null)}
                                >
                                    <div style={{
                                        ...styles.featureNumber,
                                        ...(activeFeature === index ? styles.featureNumberActive : {})
                                    }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div style={styles.featureCheckWrap}>
                                        <i className="icofont-check" style={{
                                            ...styles.featureCheck,
                                            ...(activeFeature === index ? styles.featureCheckActive : {})
                                        }}></i>
                                    </div>
                                    <p style={styles.featureText}>{feature}</p>
                                    <div style={{
                                        ...styles.featureBar,
                                        ...(activeFeature === index ? styles.featureBarActive : {})
                                    }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats Strip */}
                <div style={styles.statsStrip}>
                    {[
                        { icon: 'icofont-checked', label: 'Verified Suppliers', value: '200+' },
                        { icon: 'icofont-clock-time', label: 'Years Experience', value: '10+' },
                        { icon: 'icofont-star', label: 'Client Satisfaction', value: '98%' },
                        { icon: 'icofont-india', label: 'Pan-India Network', value: 'Active' },
                    ].map((stat, i) => (
                        <div key={i} style={styles.statItem}>
                            <i className={stat.icon} style={styles.statIcon}></i>
                            <div style={styles.statValue}>{stat.value}</div>
                            <div style={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <div style={styles.relatedSection}>
                        <div style={styles.sectionHeader}>
                            <span style={styles.sectionTag}>Explore More</span>
                            <h2 style={styles.sectionTitle}>Related Services</h2>
                        </div>
                        <div style={styles.relatedGrid}>
                            {relatedServices.map((related, i) => (
                                <div
                                    key={related.id}
                                    style={styles.relatedCard}
                                    onClick={() => handleRelatedClick(related.slug)}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 24px 60px rgba(245,91,20,0.18)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 24px rgba(19,30,60,0.08)';
                                    }}
                                >
                                    <div style={styles.relatedImageWrap}>
                                        <img
                                            src={related.image}
                                            alt={related.title}
                                            style={styles.relatedImage}
                                            onError={e => { e.target.style.display = 'none'; }}
                                        />
                                        <div style={styles.relatedImageOverlay}></div>
                                        <div style={styles.relatedArrow}>
                                            <i className="icofont-long-arrow-right"></i>
                                        </div>
                                    </div>
                                    <div style={styles.relatedBody}>
                                        <div style={styles.relatedIndex}>
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <h3 style={styles.relatedTitle}>{related.title}</h3>
                                        <p style={styles.relatedText}>{related.shortDescription}</p>
                                        <div style={styles.relatedCta}>
                                            Explore Service
                                            <i className="icofont-long-arrow-right" style={{ marginLeft: 8 }}></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

const ORANGE = '#f55b14';
const NAVY  = '#131e3c';
const DEEP  = '#0f1934';

const styles = {
    section: {
        background: '#f7f8fc',
        minHeight: '100vh',
        paddingBottom: 80,
    },

    /* Empty state */
    emptySection: {
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7f8fc',
    },
    emptyBox: {
        textAlign: 'center',
        padding: '60px 40px',
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 8px 40px rgba(19,30,60,0.08)',
    },
    emptyIcon: { fontSize: 64, color: ORANGE, display: 'block', marginBottom: 20 },
    emptyTitle: { fontSize: 26, color: NAVY, fontWeight: 700, marginBottom: 10 },
    emptyText: { color: '#6b7280', fontSize: 16 },

    /* Hero */
    heroBanner: {
        position: 'relative',
        height: 460,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
    },
    heroImage: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
    },
    heroOverlay: {
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${DEEP}ee 0%, ${ORANGE}99 60%, transparent 100%)`,
        zIndex: 1,
    },
    heroContent: {
        position: 'relative',
        zIndex: 2,
        padding: '0 60px 60px',
        maxWidth: 700,
    },
    heroBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        background: ORANGE,
        color: '#fff',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
        padding: '6px 18px',
        borderRadius: 50,
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: 46,
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1.15,
        marginBottom: 16,
        textShadow: '0 2px 20px rgba(0,0,0,0.3)',
    },
    heroDivider: {
        width: 60,
        height: 4,
        background: ORANGE,
        borderRadius: 4,
        marginBottom: 20,
    },
    heroSubtitle: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 17,
        lineHeight: 1.7,
    },

    /* Container */
    container: {
        maxWidth: 1160,
        margin: '0 auto',
        padding: '0 24px',
    },

    /* Description Card */
    descriptionCard: {
        background: '#fff',
        borderRadius: 16,
        marginTop: -40,
        position: 'relative',
        zIndex: 3,
        boxShadow: '0 8px 40px rgba(19,30,60,0.10)',
        overflow: 'hidden',
        display: 'flex',
        marginBottom: 48,
    },
    descriptionAccent: {
        width: 6,
        background: `linear-gradient(180deg, ${ORANGE}, ${DEEP})`,
        flexShrink: 0,
    },
    descriptionBody: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 24,
        padding: '36px 40px',
    },
    descriptionIconWrap: {
        width: 52,
        height: 52,
        borderRadius: 14,
        background: `linear-gradient(135deg, ${ORANGE}22, ${ORANGE}44)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    descriptionIcon: { fontSize: 26, color: ORANGE },
    descriptionLabel: {
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: ORANGE,
        marginBottom: 10,
    },
    descriptionText: {
        color: '#4b5563',
        fontSize: 16,
        lineHeight: 1.85,
        margin: 0,
    },

    /* Section Header */
    sectionHeader: {
        marginBottom: 36,
    },
    sectionTag: {
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: ORANGE,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 34,
        fontWeight: 800,
        color: NAVY,
        margin: 0,
        lineHeight: 1.2,
    },

    /* Features */
    featuresSection: {
        marginBottom: 56,
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
    },
    featureCard: {
        background: '#fff',
        borderRadius: 14,
        padding: '28px 28px 24px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(19,30,60,0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        border: '1.5px solid transparent',
    },
    featureCardActive: {
        transform: 'translateY(-4px)',
        boxShadow: `0 16px 48px rgba(245,91,20,0.14)`,
        border: `1.5px solid ${ORANGE}33`,
    },
    featureNumber: {
        position: 'absolute',
        top: 16,
        right: 20,
        fontSize: 36,
        fontWeight: 800,
        color: '#f0f2f7',
        lineHeight: 1,
        transition: 'color 0.25s',
    },
    featureNumberActive: {
        color: `${ORANGE}22`,
    },
    featureCheckWrap: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: `${ORANGE}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    featureCheck: {
        fontSize: 20,
        color: ORANGE,
        transition: 'transform 0.2s',
    },
    featureCheckActive: {
        transform: 'scale(1.2)',
    },
    featureText: {
        color: '#374151',
        fontSize: 15,
        lineHeight: 1.6,
        fontWeight: 500,
        margin: 0,
    },
    featureBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 3,
        width: 0,
        background: ORANGE,
        borderRadius: '0 4px 4px 0',
        transition: 'width 0.35s ease',
    },
    featureBarActive: {
        width: '100%',
    },

    /* Stats Strip */
    statsStrip: {
        background: `linear-gradient(135deg, ${DEEP} 0%, ${NAVY} 100%)`,
        borderRadius: 20,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        marginBottom: 64,
        overflow: 'hidden',
    },
    statItem: {
        padding: '40px 24px',
        textAlign: 'center',
        borderRight: '1px solid rgba(255,255,255,0.08)',
    },
    statIcon: {
        fontSize: 28,
        color: ORANGE,
        display: 'block',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 32,
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1,
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.55)',
        fontWeight: 500,
        letterSpacing: 0.5,
    },

    /* Related Services */
    relatedSection: {
        marginBottom: 20,
    },
    relatedGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 28,
    },
    relatedCard: {
        background: '#fff',
        borderRadius: 18,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 24px rgba(19,30,60,0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    relatedImageWrap: {
        position: 'relative',
        height: 200,
        overflow: 'hidden',
    },
    relatedImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.4s ease',
    },
    relatedImageOverlay: {
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg, transparent 40%, ${DEEP}cc 100%)`,
    },
    relatedArrow: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 36,
        height: 36,
        background: ORANGE,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 16,
    },
    relatedBody: {
        padding: '28px 28px 24px',
    },
    relatedIndex: {
        fontSize: 11,
        fontWeight: 700,
        color: ORANGE,
        letterSpacing: 2,
        marginBottom: 10,
    },
    relatedTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: NAVY,
        marginBottom: 10,
        lineHeight: 1.3,
    },
    relatedText: {
        color: '#6b7280',
        fontSize: 14,
        lineHeight: 1.65,
        marginBottom: 20,
    },
    relatedCta: {
        display: 'inline-flex',
        alignItems: 'center',
        color: ORANGE,
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: 0.5,
    },
};

export default ServiceDetailsContent;