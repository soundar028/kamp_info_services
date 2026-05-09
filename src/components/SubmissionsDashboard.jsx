import React, { useEffect, useState } from 'react';

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwhk7tGZEvFBuZX1uDHUYOT42w7xouDd46EnUcgU_OMQbj5veGEK7tbgzOoW6Onp7w-/exec";

const ORANGE = '#f55b14';
const NAVY   = '#131e3c';
const DEEP   = '#0f1934';

const BADGE_COLORS = {
    Supplier: { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
    Customer: { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
    Others:   { bg: '#f5f3ff', color: '#6d28d9', border: '#ddd6fe' },
};

const SubmissionsDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filtered, setFiltered]       = useState([]);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState('');
    const [search, setSearch]           = useState('');
    const [typeFilter, setTypeFilter]   = useState('All');
    const [selected, setSelected]       = useState(null);
    const [sortOrder, setSortOrder]     = useState('newest');
    const [imgModal, setImgModal]       = useState(null); // for full image preview

    useEffect(() => { fetchSubmissions(); }, []);
    useEffect(() => { applyFilters(); }, [submissions, search, typeFilter, sortOrder]);

    const fetchSubmissions = async () => {
        setLoading(true); setError('');
        try {
            const res  = await fetch(SHEET_URL);
            const json = await res.json();
            if (json.status === 'success') setSubmissions(json.data);
            else setError('Failed to load submissions.');
        } catch { setError('Could not connect. Check your SHEET_URL.'); }
        finally { setLoading(false); }
    };

    const applyFilters = () => {
        let data = [...submissions];
        if (typeFilter !== 'All') data = data.filter(s => s['Enquiry Type'] === typeFilter);
        if (search.trim()) {
            const q = search.toLowerCase();
            data = data.filter(s => Object.values(s).some(v => String(v).toLowerCase().includes(q)));
        }
        data.sort((a, b) => {
            const da = new Date(a['Timestamp']), db = new Date(b['Timestamp']);
            return sortOrder === 'newest' ? db - da : da - db;
        });
        setFiltered(data);
    };

    const getInitials    = (n = '') => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const avatarColor    = (n = '') => ['#f55b14','#131e3c','#0f1934','#7c3aed','#0891b2','#059669'][n.charCodeAt(0) % 6];
    const isImage        = (type = '') => type.startsWith('image/');
    const isPDF          = (type = '') => type === 'application/pdf';
    const isDoc          = (type = '') => type.includes('word');
    const hasAttachment  = (sub) => sub['Attachment Data'] && sub['Attachment Data'].length > 10;

    const getFileIcon = (type = '') => {
        if (isPDF(type))   return { icon: 'icofont-file-pdf',      color: '#ef4444', label: 'PDF' };
        if (isDoc(type))   return { icon: 'icofont-file-word',     color: '#2563eb', label: 'DOC' };
        if (isImage(type)) return { icon: 'icofont-file-image',    color: '#059669', label: 'IMG' };
        return               { icon: 'icofont-file-document', color: '#6b7280', label: 'FILE' };
    };

    // Download file from base64
    const handleDownload = (sub) => {
        const base64 = sub['Attachment Data'];
        const name   = sub['Attachment Name'];
        if (!base64) return;
        const a = document.createElement('a');
        a.href     = base64;
        a.download = name;
        a.click();
    };

    return (
        <div style={styles.page}>

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerInner}>
                    <div>
                        <div style={styles.headerTag}>Admin Panel</div>
                        <h1 style={styles.headerTitle}>Form Submissions</h1>
                        <p style={styles.headerSub}>All contact form entries from your website</p>
                    </div>
                    <button onClick={fetchSubmissions} style={styles.refreshBtn}>
                        <i className="icofont-refresh" style={{ marginRight: 8 }}></i>Refresh
                    </button>
                </div>
                {!loading && !error && (
                    <div style={styles.statsRow}>
                        {[
                            { label: 'Total',    value: submissions.length,                                              icon: 'icofont-list'    },
                            { label: 'Supplier', value: submissions.filter(s => s['Enquiry Type'] === 'Supplier').length, icon: 'icofont-checked' },
                            { label: 'Customer', value: submissions.filter(s => s['Enquiry Type'] === 'Customer').length, icon: 'icofont-star'    },
                            { label: 'Others',   value: submissions.filter(s => s['Enquiry Type'] === 'Others').length,   icon: 'icofont-users'   },
                        ].map((s, i) => (
                            <div key={i} style={styles.statCard}>
                                <i className={s.icon} style={{ ...styles.statIcon, color: i === 0 ? ORANGE : '#94a3b8' }}></i>
                                <div style={styles.statValue}>{s.value}</div>
                                <div style={styles.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={styles.body}>
                {/* Filters */}
                <div style={styles.filterRow}>
                    <div style={styles.searchWrap}>
                        <i className="icofont-search" style={styles.searchIcon}></i>
                        <input
                            type="text" placeholder="Search by name, email, message..."
                            value={search} onChange={e => setSearch(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <div style={styles.filterGroup}>
                        {['All','Supplier','Customer','Others'].map(t => (
                            <button key={t} onClick={() => setTypeFilter(t)}
                                style={{ ...styles.filterBtn, ...(typeFilter === t ? styles.filterBtnActive : {}) }}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={styles.sortSelect}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>

                {loading && (
                    <div style={styles.centerState}>
                        <i className="icofont-spinner icofont-spin" style={{ fontSize: 40, color: ORANGE }}></i>
                        <p style={{ marginTop: 16, color: '#6b7280' }}>Loading submissions...</p>
                    </div>
                )}
                {error && !loading && (
                    <div style={styles.errorBox}>
                        <i className="icofont-warning" style={{ fontSize: 28, color: '#ef4444', marginBottom: 10 }}></i>
                        <p style={{ color: '#ef4444', fontWeight: 600 }}>{error}</p>
                    </div>
                )}
                {!loading && !error && filtered.length === 0 && (
                    <div style={styles.centerState}>
                        <i className="icofont-inbox" style={{ fontSize: 48, color: '#d1d5db' }}></i>
                        <p style={{ marginTop: 16, color: '#9ca3af', fontSize: 16 }}>No submissions found</p>
                    </div>
                )}

                {/* Cards */}
                {!loading && !error && filtered.length > 0 && (
                    <div style={styles.grid}>
                        {filtered.map((sub, i) => {
                            const badge = BADGE_COLORS[sub['Enquiry Type']] || BADGE_COLORS['Others'];
                            const att   = getFileIcon(sub['Attachment Type']);
                            const hasFile = hasAttachment(sub);

                            return (
                                <div key={i} style={styles.card}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(245,91,20,0.12)'; e.currentTarget.style.borderColor = `${ORANGE}44`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(19,30,60,0.07)'; e.currentTarget.style.borderColor = '#f0f0f0'; }}
                                >
                                    <div style={styles.cardTop}>
                                        <div style={{ ...styles.avatar, background: avatarColor(sub['Name']) }}>{getInitials(sub['Name'])}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={styles.cardName}>{sub['Name'] || '—'}</div>
                                            <div style={styles.cardOrg}>{sub['Organization'] || '—'}</div>
                                        </div>
                                        <span style={{ ...styles.badge, background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}>
                                            {sub['Enquiry Type'] || '—'}
                                        </span>
                                    </div>

                                    <div style={styles.cardInfo}>
                                        {[
                                            { icon: 'icofont-email',      val: sub['Email'] },
                                            { icon: 'icofont-phone',      val: sub['Phone'] },
                                            { icon: 'icofont-clock-time', val: sub['Timestamp'] },
                                        ].map(({ icon, val }, idx) => (
                                            <div key={idx} style={styles.infoRow}>
                                                <i className={icon} style={styles.infoIcon}></i>
                                                <span style={styles.infoText}>{val || '—'}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={styles.messageBox}>
                                        <p style={styles.messageText}>
                                            {sub['Message']?.length > 100 ? sub['Message'].slice(0, 100) + '...' : sub['Message'] || '—'}
                                        </p>
                                    </div>

                                    {/* Attachment preview on card */}
                                    {hasFile && (
                                        <div style={styles.attachmentBox}>
                                            {isImage(sub['Attachment Type']) ? (
                                                <div style={styles.imageThumbWrap}>
                                                    <img
                                                        src={sub['Attachment Data']}
                                                        alt={sub['Attachment Name']}
                                                        style={styles.imageThumb}
                                                        onClick={() => setImgModal(sub['Attachment Data'])}
                                                    />
                                                    <div style={styles.imageThumbOverlay} onClick={() => setImgModal(sub['Attachment Data'])}>
                                                        <i className="icofont-eye" style={{ color: '#fff', fontSize: 20 }}></i>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div style={styles.docPreview}>
                                                    <i className={att.icon} style={{ fontSize: 32, color: att.color }}></i>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={styles.attachName}>{sub['Attachment Name']}</div>
                                                        <div style={styles.attachMeta}>{att.label} Document</div>
                                                    </div>
                                                </div>
                                            )}
                                            <button onClick={() => handleDownload(sub)} style={styles.downloadBtn}>
                                                <i className="icofont-download" style={{ marginRight: 6 }}></i>Download
                                            </button>
                                        </div>
                                    )}

                                    {!hasFile && (
                                        <div style={styles.noAttach}>
                                            <i className="icofont-paper-clip" style={{ marginRight: 6, opacity: 0.4 }}></i>
                                            <span>No attachment</span>
                                        </div>
                                    )}

                                    <button onClick={() => setSelected(sub)} style={styles.viewBtn}
                                        onMouseEnter={e => e.target.style.background = NAVY}
                                        onMouseLeave={e => e.target.style.background = ORANGE}>
                                        View Full Details
                                        <i className="icofont-long-arrow-right" style={{ marginLeft: 8 }}></i>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── Full Image Preview Modal ── */}
            {imgModal && (
                <div style={styles.modalOverlay} onClick={() => setImgModal(null)}>
                    <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <img src={imgModal} alt="preview" style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 12, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }} />
                        <button onClick={() => setImgModal(null)} style={{ ...styles.closeBtn, position: 'absolute', top: -16, right: -16 }}>
                            <i className="icofont-close"></i>
                        </button>
                    </div>
                </div>
            )}

            {/* ── Detail Modal ── */}
            {selected && (
                <div style={styles.modalOverlay} onClick={() => setSelected(null)}>
                    <div style={styles.modal} onClick={e => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <div style={{ ...styles.avatar, width: 52, height: 52, fontSize: 18, background: avatarColor(selected['Name']) }}>
                                {getInitials(selected['Name'])}
                            </div>
                            <div>
                                <h2 style={styles.modalName}>{selected['Name']}</h2>
                                <p style={styles.modalOrg}>{selected['Organization']}</p>
                            </div>
                            <button onClick={() => setSelected(null)} style={styles.closeBtn}>
                                <i className="icofont-close"></i>
                            </button>
                        </div>

                        <div style={styles.modalBody}>
                            {[
                                { label: 'Email',        icon: 'icofont-email',      value: selected['Email'] },
                                { label: 'Phone',        icon: 'icofont-phone',      value: selected['Phone'] },
                                { label: 'Organization', icon: 'icofont-building',   value: selected['Organization'] },
                                { label: 'Enquiry Type', icon: 'icofont-users',      value: selected['Enquiry Type'] },
                                { label: 'Submitted At', icon: 'icofont-clock-time', value: selected['Timestamp'] },
                            ].map(({ label, icon, value }) => (
                                <div key={label} style={styles.modalRow}>
                                    <div style={styles.modalLabel}>
                                        <i className={icon} style={{ marginRight: 8, color: ORANGE }}></i>{label}
                                    </div>
                                    <div style={styles.modalValue}>{value || '—'}</div>
                                </div>
                            ))}

                            <div style={styles.modalMessageBox}>
                                <div style={styles.modalLabel}>
                                    <i className="icofont-chat" style={{ marginRight: 8, color: ORANGE }}></i>Message
                                </div>
                                <p style={styles.modalMessage}>{selected['Message'] || '—'}</p>
                            </div>

                            {/* Attachment in modal */}
                            <div style={{ marginTop: 20 }}>
                                <div style={styles.modalLabel}>
                                    <i className="icofont-paper-clip" style={{ marginRight: 8, color: ORANGE }}></i>Attachment
                                </div>

                                {hasAttachment(selected) ? (
                                    <div style={{ marginTop: 12 }}>
                                        {isImage(selected['Attachment Type']) ? (
                                            <>
                                                <img
                                                    src={selected['Attachment Data']}
                                                    alt={selected['Attachment Name']}
                                                    style={{ width: '100%', borderRadius: 10, maxHeight: 300, objectFit: 'contain', background: '#f9fafb', cursor: 'zoom-in' }}
                                                    onClick={() => setImgModal(selected['Attachment Data'])}
                                                />
                                                <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 6, textAlign: 'center' }}>Click image to enlarge</p>
                                            </>
                                        ) : (
                                            <div style={styles.docPreview}>
                                                <i className={getFileIcon(selected['Attachment Type']).icon}
                                                    style={{ fontSize: 36, color: getFileIcon(selected['Attachment Type']).color }}></i>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600, color: NAVY }}>{selected['Attachment Name']}</div>
                                                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{getFileIcon(selected['Attachment Type']).label} Document</div>
                                                </div>
                                            </div>
                                        )}
                                        <button onClick={() => handleDownload(selected)} style={{ ...styles.downloadBtn, width: '100%', marginTop: 12, justifyContent: 'center' }}>
                                            <i className="icofont-download" style={{ marginRight: 8 }}></i>
                                            Download {selected['Attachment Name']}
                                        </button>
                                    </div>
                                ) : (
                                    <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>No attachment submitted</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    page:          { background: '#f7f8fc', minHeight: '100vh' },
    header:        { background: `linear-gradient(135deg, ${DEEP} 0%, ${NAVY} 100%)`, padding: '40px 40px 32px' },
    headerInner:   { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 },
    headerTag:     { fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 8 },
    headerTitle:   { fontSize: 32, fontWeight: 800, color: '#fff', margin: 0 },
    headerSub:     { fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 6 },
    refreshBtn:    { display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    statsRow:      { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 },
    statCard:      { background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' },
    statIcon:      { fontSize: 22, display: 'block', marginBottom: 8 },
    statValue:     { fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1 },
    statLabel:     { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 },
    body:          { maxWidth: 1200, margin: '0 auto', padding: '32px 24px' },
    filterRow:     { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' },
    searchWrap:    { position: 'relative', flex: 1, minWidth: 220 },
    searchIcon:    { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 16 },
    searchInput:   { width: '100%', padding: '10px 14px 10px 40px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' },
    filterGroup:   { display: 'flex', gap: 6 },
    filterBtn:     { padding: '8px 16px', border: '1.5px solid #e5e7eb', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#fff', color: '#6b7280' },
    filterBtnActive: { background: ORANGE, border: `1.5px solid ${ORANGE}`, color: '#fff' },
    sortSelect:    { padding: '9px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, background: '#fff', cursor: 'pointer', outline: 'none' },
    centerState:   { textAlign: 'center', padding: '80px 20px' },
    errorBox:      { textAlign: 'center', padding: '40px', background: '#fef2f2', borderRadius: 12, border: '1px solid #fecaca' },
    grid:          { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 },
    card:          { background: '#fff', borderRadius: 16, padding: '24px', border: '1.5px solid #f0f0f0', boxShadow: '0 2px 16px rgba(19,30,60,0.07)', transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s' },
    cardTop:       { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 },
    avatar:        { width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 15, flexShrink: 0 },
    cardName:      { fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 2 },
    cardOrg:       { fontSize: 13, color: '#6b7280' },
    badge:         { fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, flexShrink: 0 },
    cardInfo:      { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 },
    infoRow:       { display: 'flex', alignItems: 'center', gap: 8 },
    infoIcon:      { fontSize: 14, color: ORANGE, flexShrink: 0 },
    infoText:      { fontSize: 13, color: '#4b5563', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    messageBox:    { background: '#f9fafb', borderRadius: 8, padding: '10px 14px', marginBottom: 14, borderLeft: `3px solid ${ORANGE}` },
    messageText:   { fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: 0 },
    // Attachment
    attachmentBox: { background: '#f9fafb', borderRadius: 10, padding: '12px 14px', marginBottom: 14 },
    imageThumbWrap:{ position: 'relative', width: '100%', height: 140, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', marginBottom: 10 },
    imageThumb:    { width: '100%', height: '100%', objectFit: 'cover' },
    imageThumbOverlay: { position: 'absolute', inset: 0, background: 'rgba(19,30,60,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', cursor: 'pointer' },
    docPreview:    { display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0', marginBottom: 10 },
    attachName:    { fontSize: 13, fontWeight: 600, color: NAVY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    attachMeta:    { fontSize: 12, color: '#9ca3af', marginTop: 2 },
    downloadBtn:   { display: 'inline-flex', alignItems: 'center', background: ORANGE, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' },
    noAttach:      { display: 'flex', alignItems: 'center', fontSize: 13, color: '#9ca3af', marginBottom: 14 },
    viewBtn:       { width: '100%', background: ORANGE, color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    // Modals
    modalOverlay:  { position: 'fixed', inset: 0, background: 'rgba(15,25,52,0.75)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
    modal:         { background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(19,30,60,0.3)' },
    modalHeader:   { display: 'flex', alignItems: 'center', gap: 16, padding: '28px 28px 20px', borderBottom: '1px solid #f0f0f0' },
    modalName:     { fontSize: 20, fontWeight: 800, color: NAVY, margin: 0 },
    modalOrg:      { fontSize: 13, color: '#6b7280', margin: '2px 0 0' },
    closeBtn:      { marginLeft: 'auto', background: '#f3f4f6', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: '#374151', flexShrink: 0 },
    modalBody:     { padding: '20px 28px 28px' },
    modalRow:      { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f9fafb' },
    modalLabel:    { fontSize: 13, fontWeight: 600, color: '#6b7280', display: 'flex', alignItems: 'center' },
    modalValue:    { fontSize: 14, fontWeight: 500, color: NAVY, textAlign: 'right', maxWidth: '60%' },
    modalMessageBox: { marginTop: 16, background: '#f9fafb', borderRadius: 10, padding: '14px 16px', borderLeft: `4px solid ${ORANGE}` },
    modalMessage:  { fontSize: 14, color: '#4b5563', lineHeight: 1.75, margin: '8px 0 0' },
};

export default SubmissionsDashboard;