import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const SHEET_URL   = "https://script.google.com/macros/s/AKfycbw3zK57CDRjVCW1EzDO45X4iM5tv7xmQkj7JZL-v_YHSoBWxYfZvQFlR9kmNE14mzsB/exec";
const STORAGE_KEY = "kamp_lead_captured";

const ORANGE = '#f55b14';
const NAVY   = '#131e3c';
const DEEP   = '#0b1120';

const LeadPopup = () => {
    const location                    = useLocation();
    const [visible,    setVisible]    = useState(false);
    const [closing,    setClosing]    = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [step,       setStep]       = useState(1);
    const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);
    const [form,       setForm]       = useState({
        name: '', email: '', phone: '', organization: '', enquiryType: ''
    });
    const [errors, setErrors] = useState({});

    // Inject keyframes once
    useEffect(() => {
        if (document.getElementById('popup-kf')) return;
        const s = document.createElement('style');
        s.id = 'popup-kf';
        s.textContent = `
            @keyframes popupFadeIn  { from{opacity:0} to{opacity:1} }
            @keyframes popupSlideIn { from{opacity:0;transform:translateY(40px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
            @keyframes popupFadeOut { from{opacity:1} to{opacity:0} }
            @keyframes popupSlideOut{ from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(20px)} }
            @keyframes successBounce{ 0%{transform:scale(0)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
            @keyframes orbFloat     { 0%,100%{transform:translate(0,0)} 50%{transform:translate(8px,-10px)} }
        `;
        document.head.appendChild(s);
    }, []);

    // Track mobile resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Re-check on every route change
    useEffect(() => {
        const already = localStorage.getItem(STORAGE_KEY);
        if (already) return;
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
    }, [location.pathname]);

    // Handle escape key to close
    useEffect(() => {
        if (!visible) return;
        const handleEscape = (e) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [visible]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setVisible(false);
            setClosing(false);
        }, 350);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim())         errs.name         = 'Name is required';
        if (!form.email.trim())        errs.email        = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
        if (!form.phone.trim())        errs.phone        = 'Phone is required';
        if (!form.organization.trim()) errs.organization = 'Organization is required';
        if (!form.enquiryType)         errs.enquiryType  = 'Please select a type';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSubmitting(true);
        try {
            await fetch(SHEET_URL, {
                method:  'POST',
                headers: { 'Content-Type': 'text/plain' },
                body:    JSON.stringify({
                    ...form,
                    message:        'Lead captured via popup',
                    attachmentName: '',
                    attachmentType: '',
                    attachmentData: '',
                    _source:        'popup',
                }),
            });

            localStorage.setItem(STORAGE_KEY, 'true');
            setStep(2);

        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!visible) return null;

    const getStyles = () => {
        if (isMobile) {
            return {
                ...styles,
                popup:       { ...styles.popup, flexDirection: 'column', maxWidth: '100%', width: '100%', maxHeight: '100vh', borderRadius: 16, overflowX: 'hidden' },
                leftPanel:   { ...styles.leftPanel, width: '100%', flexShrink: 1, padding: '28px 20px', minHeight: 'auto' },
                rightPanel:  { ...styles.rightPanel, padding: '28px 20px', maxHeight: '70vh', overflowX: 'hidden' },
                hexWrap:     { ...styles.hexWrap, marginBottom: 14 },
                leftTitle:   { ...styles.leftTitle, fontSize: 18 },
                leftText:    { ...styles.leftText, fontSize: 12 },
                benefitIcon: { ...styles.benefitIcon, fontSize: 12 },
                benefitText: { ...styles.benefitText, fontSize: 12 },
                formTitle:   { ...styles.formTitle, fontSize: 18 },
                formSub:     { ...styles.formSub, fontSize: 12 },
                row2:        { ...styles.row2, gridTemplateColumns: '1fr', gap: 12 }, // Single column on mobile
                input:       { ...styles.input, fontSize: 14, padding: '11px 14px 11px 38px' },
                submitBtn:   { ...styles.submitBtn, padding: '12px 16px', fontSize: 14 },
                successTitle:{ ...styles.successTitle, fontSize: 22 },
                successMeta: { ...styles.successMeta, padding: '12px 16px' },
                successMetaItem: { ...styles.successMetaItem, fontSize: 13 },
            };
        }
        return styles;
    };

    const computedStyles = getStyles();

    return (
        <div style={{
            ...computedStyles.overlay,
            animation: closing ? 'popupFadeOut 0.35s ease forwards' : 'popupFadeIn 0.35s ease forwards',
        }}
        onClick={(e) => {
            if (e.target === e.currentTarget) handleClose(); // Click outside popup to close
        }}>
            <div style={{
                ...computedStyles.popup,
                animation: closing ? 'popupSlideOut 0.35s ease forwards' : 'popupSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}
            onClick={(e) => e.stopPropagation()}>

                {/* Left panel — hidden on mobile */}
                {!isMobile && (
                    <div style={computedStyles.leftPanel}>
                        <div style={styles.orb1} />
                        <div style={styles.orb2} />
                        <div style={styles.gridBg} />
                        <div style={styles.leftContent}>
                            <div style={computedStyles.hexWrap}>
                                <svg viewBox="0 0 100 100" style={{ width: 80, height: 80 }}>
                                    <polygon points="50,8 88,29 88,71 50,92 12,71 12,29"
                                        fill="none" stroke={ORANGE} strokeWidth="2" opacity="0.5" />
                                    <polygon points="50,18 78,34 78,66 50,82 22,66 22,34"
                                        fill={ORANGE} opacity="0.12" />
                                    <text x="50" y="46" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800" letterSpacing="1">KAMP</text>
                                    <text x="50" y="58" textAnchor="middle" fill={ORANGE} fontSize="6" letterSpacing="0.5">INFO SERVICES</text>
                                </svg>
                            </div>
                            <h2 style={computedStyles.leftTitle}>Welcome to<br /><span style={{ color: ORANGE }}>KAMP Info Services</span></h2>
                            <p style={computedStyles.leftText}>
                                India's trusted sourcing partner for precision aluminum die castings.
                                Connect with 200+ verified suppliers.
                            </p>
                            <div style={styles.benefits}>
                                {[
                                    { icon: 'icofont-checked', text: 'Pan-India Supplier Network'  },
                                    { icon: 'icofont-gears',   text: 'HPDC / GDC / LPDC Expertise' },
                                    { icon: 'icofont-star',    text: '98% Client Satisfaction'      },
                                ].map((b, i) => (
                                    <div key={i} style={styles.benefit}>
                                        <i className={b.icon} style={computedStyles.benefitIcon} />
                                        <span style={computedStyles.benefitText}>{b.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Right panel */}
                <div style={computedStyles.rightPanel}>
                    <button onClick={handleClose} style={styles.closeBtn} title="Close (ESC)"
                        onMouseEnter={e => { e.currentTarget.style.background = '#e5e7eb'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.transform = 'scale(1)'; }}>
                        <i className="icofont-close"></i>
                    </button>

                    {step === 1 ? (
                        <>
                            {isMobile && (
                                <div style={styles.mobileHeader}>
                                    <div style={{ ...styles.hexWrap, marginBottom: 12 }}>
                                        <svg viewBox="0 0 100 100" style={{ width: 60, height: 60 }}>
                                            <polygon points="50,8 88,29 88,71 50,92 12,71 12,29"
                                                fill="none" stroke={ORANGE} strokeWidth="2" opacity="0.5" />
                                            <polygon points="50,18 78,34 78,66 50,82 22,66 22,34"
                                                fill={ORANGE} opacity="0.12" />
                                            <text x="50" y="46" textAnchor="middle" fill={NAVY} fontSize="8" fontWeight="800">K</text>
                                        </svg>
                                    </div>
                                    <h2 style={{ ...computedStyles.leftTitle, marginBottom: 6 }}>Welcome!</h2>
                                    <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>
                                        Connect with India's trusted aluminum die casting sourcing partner
                                    </p>
                                </div>
                            )}

                            <div style={computedStyles.formHeader}>
                                <div style={styles.formTag}>
                                    <span style={styles.tagDot} />Quick Connect
                                </div>
                                <h3 style={computedStyles.formTitle}>Get in Touch</h3>
                                <p style={computedStyles.formSub}>Share your details and we'll reach out shortly.</p>
                            </div>

                            <form onSubmit={handleSubmit} noValidate>
                                <div style={computedStyles.row2}>
                                    <div style={styles.fieldWrap}>
                                        <div style={styles.inputWrap}>
                                            <i className="icofont-user" style={styles.inputIcon}></i>
                                            <input type="text" name="name" placeholder="Your Name *"
                                                value={form.name} onChange={handleChange}
                                                style={{ ...computedStyles.input, ...(errors.name ? styles.inputError : {}) }} />
                                        </div>
                                        {errors.name && <span style={styles.errMsg}>{errors.name}</span>}
                                    </div>
                                    <div style={styles.fieldWrap}>
                                        <div style={styles.inputWrap}>
                                            <i className="icofont-phone" style={styles.inputIcon}></i>
                                            <input type="tel" name="phone" placeholder="Phone Number *"
                                                value={form.phone} onChange={handleChange}
                                                style={{ ...computedStyles.input, ...(errors.phone ? styles.inputError : {}) }} />
                                        </div>
                                        {errors.phone && <span style={styles.errMsg}>{errors.phone}</span>}
                                    </div>
                                </div>

                                <div style={styles.fieldWrap}>
                                    <div style={styles.inputWrap}>
                                        <i className="icofont-email" style={styles.inputIcon}></i>
                                        <input type="email" name="email" placeholder="Email Address *"
                                            value={form.email} onChange={handleChange}
                                            style={{ ...computedStyles.input, ...(errors.email ? styles.inputError : {}) }} />
                                    </div>
                                    {errors.email && <span style={styles.errMsg}>{errors.email}</span>}
                                </div>

                                <div style={styles.fieldWrap}>
                                    <div style={styles.inputWrap}>
                                        <i className="icofont-building" style={styles.inputIcon}></i>
                                        <input type="text" name="organization" placeholder="Organization *"
                                            value={form.organization} onChange={handleChange}
                                            style={{ ...computedStyles.input, ...(errors.organization ? styles.inputError : {}) }} />
                                    </div>
                                    {errors.organization && <span style={styles.errMsg}>{errors.organization}</span>}
                                </div>

                                <div style={styles.fieldWrap}>
                                    <div style={styles.inputWrap}>
                                        <i className="icofont-users" style={styles.inputIcon}></i>
                                        <select name="enquiryType" value={form.enquiryType} onChange={handleChange}
                                            style={{ ...computedStyles.input, ...styles.select, ...(errors.enquiryType ? styles.inputError : {}), color: form.enquiryType ? NAVY : '#9ca3af' }}>
                                            <option value="" disabled>I am a — Select Type *</option>
                                            <option value="Supplier">Supplier</option>
                                            <option value="Customer">Customer</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                    {errors.enquiryType && <span style={styles.errMsg}>{errors.enquiryType}</span>}
                                </div>

                                <button type="submit" disabled={submitting}
                                    style={{ ...computedStyles.submitBtn, ...(submitting ? { opacity: 0.75, cursor: 'not-allowed' } : {}) }}>
                                    {submitting
                                        ? <><i className="icofont-spinner icofont-spin" style={{ marginRight: 8 }}></i>Submitting...</>
                                        : <>Submit Details <i className="icofont-long-arrow-right" style={{ marginLeft: 8 }}></i></>
                                    }
                                </button>

                                <p style={styles.privacy}>
                                    <i className="icofont-lock" style={{ marginRight: 5, color: ORANGE }}></i>
                                    Your details are safe and never shared.
                                </p>

                                <button type="button" onClick={handleClose} style={styles.skipBtn}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#6b7280'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#9ca3af'; }}>
                                    Skip for Now
                                </button>
                            </form>
                        </>
                    ) : (
                        <div style={styles.successWrap}>
                            <div style={styles.successIcon}>
                                <i className="icofont-check" style={{ fontSize: isMobile ? 28 : 36, color: '#fff' }}></i>
                            </div>
                            <h3 style={computedStyles.successTitle}>Thank You!</h3>
                            <p style={computedStyles.successText}>
                                We've received your details and will contact you shortly.
                            </p>
                            <div style={computedStyles.successMeta}>
                                <div style={computedStyles.successMetaItem}>
                                    <i className="icofont-email" style={{ color: ORANGE, marginRight: 8 }}></i>
                                    {form.email}
                                </div>
                                <div style={computedStyles.successMetaItem}>
                                    <i className="icofont-phone" style={{ color: ORANGE, marginRight: 8 }}></i>
                                    {form.phone}
                                </div>
                            </div>
                            <button onClick={handleClose} style={computedStyles.submitBtn}>
                                Explore Our Services
                                <i className="icofont-long-arrow-right" style={{ marginLeft: 8 }}></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay:     { position: 'fixed', inset: 0, background: 'rgba(11,17,32,0.8)', backdropFilter: 'blur(6px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflow: 'hidden', boxSizing: 'border-box' },
    popup:       { display: 'flex', width: '100%', maxWidth: 860, maxHeight: '95vh', borderRadius: 20, overflow: 'hidden', overflowX: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', boxSizing: 'border-box' },
    leftPanel:   { position: 'relative', width: 300, flexShrink: 0, background: `linear-gradient(145deg, ${DEEP} 0%, ${NAVY} 100%)`, padding: '40px 28px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxSizing: 'border-box' },
    orb1:        { position: 'absolute', top: '-10%', right: '-20%', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${ORANGE}28 0%, transparent 65%)`, pointerEvents: 'none', animation: 'orbFloat 5s ease-in-out infinite' },
    orb2:        { position: 'absolute', bottom: '-10%', left: '-10%', width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, #3b1c8c22 0%, transparent 65%)`, pointerEvents: 'none' },
    gridBg:      { position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(245,91,20,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(245,91,20,0.04) 1px, transparent 1px)`, backgroundSize: '32px 32px', pointerEvents: 'none' },
    leftContent: { position: 'relative', zIndex: 2 },
    hexWrap:     { marginBottom: 20 },
    leftTitle:   { fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 12 },
    leftText:    { fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 24 },
    benefits:    { display: 'flex', flexDirection: 'column', gap: 12 },
    benefit:     { display: 'flex', alignItems: 'center', gap: 10 },
    benefitIcon: { fontSize: 14, color: ORANGE, flexShrink: 0 },
    benefitText: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 },
    rightPanel:  { flex: 1, background: '#fff', padding: '36px 32px', overflowY: 'auto', position: 'relative', boxSizing: 'border-box', minWidth: 0 },
    closeBtn:    { position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: '#f3f4f6', border: 'none', cursor: 'pointer', fontSize: 14, color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'all 0.2s ease' },
    
    mobileHeader: { textAlign: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' },
    
    formHeader:  { marginBottom: 24 },
    formTag:     { display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: ORANGE, marginBottom: 10 },
    tagDot:      { width: 5, height: 5, borderRadius: '50%', background: ORANGE, display: 'inline-block', boxShadow: `0 0 6px ${ORANGE}` },
    formTitle:   { fontSize: 22, fontWeight: 800, color: NAVY, margin: '0 0 6px' },
    formSub:     { fontSize: 13, color: '#6b7280', lineHeight: 1.6 },
    
    row2:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, boxSizing: 'border-box' },
    fieldWrap:   { marginBottom: 14, boxSizing: 'border-box', minWidth: 0 },
    inputWrap:   { position: 'relative', overflow: 'hidden', boxSizing: 'border-box' },
    inputIcon:   { position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 15, pointerEvents: 'none', zIndex: 1 },
    input:       { width: '100%', padding: '11px 14px 11px 38px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, color: NAVY, outline: 'none', background: '#fafafa', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.2s', appearance: 'none', maxWidth: '100%' },
    inputError:  { borderColor: '#ef4444', background: '#fef2f2' },
    select:      { cursor: 'pointer', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23f55b14' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 30, boxSizing: 'border-box', maxWidth: '100%' },
    errMsg:      { fontSize: 11, color: '#ef4444', marginTop: 5, display: 'block' },
    submitBtn:   { width: '100%', background: ORANGE, color: '#fff', border: 'none', borderRadius: 10, padding: '13px 20px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 24px ${ORANGE}44`, transition: 'all 0.2s', marginTop: 4 },
    privacy:     { fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    skipBtn:     { width: '100%', background: 'transparent', color: '#9ca3af', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '11px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 12, transition: 'all 0.2s' },
    
    successWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, textAlign: 'center', padding: '20px 0' },
    successIcon: { width: 72, height: 72, borderRadius: '50%', background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'successBounce 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards', boxShadow: `0 12px 32px ${ORANGE}55` },
    successTitle:{ fontSize: 26, fontWeight: 800, color: NAVY, marginBottom: 10 },
    successText: { fontSize: 14, color: '#6b7280', lineHeight: 1.7, maxWidth: 300, marginBottom: 24 },
    successMeta: { background: '#f9fafb', borderRadius: 10, padding: '14px 20px', marginBottom: 24, width: '100%', display: 'flex', flexDirection: 'column', gap: 8 },
    successMetaItem: { fontSize: 14, color: NAVY, fontWeight: 500, display: 'flex', alignItems: 'center' },
};

export default LeadPopup;