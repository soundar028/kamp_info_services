import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

// ✅ Replace with your deployed Apps Script Web App URL
const SHEET_URL = "https://script.google.com/macros/s/AKfycbw3zK57CDRjVCW1EzDO45X4iM5tv7xmQkj7JZL-v_YHSoBWxYfZvQFlR9kmNE14mzsB/exec";

const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg', 'image/png', 'image/jpg',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
const MAX_SIZE_MB = 2;

const ContactForm = () => {
    const [file, setFile]             = useState(null);
    const [fileError, setFileError]   = useState('');
    const [dragging, setDragging]     = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef                = useRef(null);

    const validateFile = (selected) => {
        setFileError('');
        if (!ALLOWED_TYPES.includes(selected.type)) {
            setFileError('Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed.');
            return false;
        }
        if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
            setFileError(`File size must be under ${MAX_SIZE_MB}MB.`);
            return false;
        }
        return true;
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && validateFile(selected)) setFile(selected);
        else setFile(null);
    };

    const handleDrop = (e) => {
        e.preventDefault(); setDragging(false);
        const selected = e.dataTransfer.files[0];
        if (selected && validateFile(selected)) setFile(selected);
        else setFile(null);
    };

    const handleRemoveFile = () => {
        setFile(null); setFileError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const toBase64 = (f) => new Promise((res, rej) => {
        const r = new FileReader();
        r.onload  = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(f);
    });

    const handleMessage = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const form = event.target;
        let attachmentData = '';
        let attachmentName = '';
        let attachmentType = '';

        if (file) {
            try {
                attachmentData = await toBase64(file);
                attachmentName = file.name;
                attachmentType = file.type;
            } catch {
                toast.error("Failed to read the attached file.");
                setSubmitting(false);
                return;
            }
        }

        const payload = {
            name:           form.name.value,
            email:          form.email.value,
            phone:          form.phone.value,
            organization:   form.organization.value,
            enquiryType:    form.enquiryType.value,
            message:        form.message.value,
            attachmentName,
            attachmentType,
            attachmentData,
        };

        try {
            // ✅ Key fix: use a plain fetch WITHOUT mode:'no-cors'
            // Apps Script must be deployed as "Anyone" for this to work
            const res = await fetch(SHEET_URL, {
                method:  'POST',
                headers: { 'Content-Type': 'text/plain' }, // text/plain avoids CORS preflight
                body:    JSON.stringify(payload),
            });

            const json = await res.json();

            if (json.status === 'success') {
                form.reset();
                setFile(null);
                setFileError('');
                toast.success("Thanks for Your Message! We'll get back to you soon.");
            } else {
                toast.error("Submission failed: " + (json.message || 'Unknown error'));
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const formatBytes = (b) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(1)} MB`;

    const getFileIcon = (type) => {
        if (type === 'application/pdf') return 'icofont-file-pdf';
        if (type?.includes('word'))     return 'icofont-file-word';
        if (type?.startsWith('image/')) return 'icofont-file-image';
        return 'icofont-file-document';
    };

    return (
        <div className="contact-page-form">
            <h2>Get in Touch</h2>
            <form onSubmit={handleMessage}>
                <div className="row">

                    <div className="col-md-6 col-sm-12">
                        <div className="single-input-field">
                            <input type="text" placeholder="Your Name*" name="name" autoComplete="off" required />
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="single-input-field">
                            <input type="email" placeholder="E-mail*" name="email" autoComplete="off" required />
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="single-input-field">
                            <input type="number" placeholder="Phone Number*" name="phone" autoComplete="off" required />
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="single-input-field">
                            <input type="text" placeholder="Organization*" name="organization" autoComplete="off" required />
                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="single-input-field">
                            <select name="enquiryType" required defaultValue="" style={selectStyle}>
                                <option value="" disabled>I am a — Select Type *</option>
                                <option value="Supplier">Supplier</option>
                                <option value="Customer">Customer</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-sm-12 message-input">
                        <div className="single-input-field">
                            <textarea placeholder="Write Your Message*" name="message" autoComplete="off" required></textarea>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="col-sm-12" style={{ marginBottom: 20 }}>
                        <div
                            style={{ ...dropzoneStyle, ...(dragging ? dropzoneActiveStyle : {}), ...(file ? dropzoneSuccessStyle : {}) }}
                            onClick={() => !file && fileInputRef.current?.click()}
                            onDragOver={e => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                        >
                            {file ? (
                                <div style={filePreviewStyle}>
                                    {file.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(file)} alt="preview" style={thumbStyle} />
                                    ) : (
                                        <i className={getFileIcon(file.type)} style={fileIconStyle}></i>
                                    )}
                                    <div style={fileInfoStyle}>
                                        <span style={fileNameStyle}>{file.name}</span>
                                        <span style={fileSizeStyle}>{formatBytes(file.size)}</span>
                                    </div>
                                    <button type="button" onClick={e => { e.stopPropagation(); handleRemoveFile(); }} style={removeButtonStyle}>
                                        <i className="icofont-close"></i>
                                    </button>
                                </div>
                            ) : (
                                <div style={dropPlaceholderStyle}>
                                    <i className="icofont-upload-alt" style={uploadIconStyle}></i>
                                    <div>
                                        <p style={uploadTitleStyle}>Drag & drop or <span style={{ color: '#f55b14', fontWeight: 700 }}>browse</span></p>
                                        <p style={uploadHintStyle}>PDF, DOC, DOCX, JPG, PNG · Max {MAX_SIZE_MB}MB</p>
                                    </div>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" accept={ALLOWED_EXTENSIONS.join(',')} onChange={handleFileChange} style={{ display: 'none' }} />
                        </div>
                        {fileError && <p style={errorStyle}><i className="icofont-warning" style={{ marginRight: 6 }}></i>{fileError}</p>}
                    </div>

                    <button type="submit" className="submit-btn" disabled={submitting} style={submitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}}>
                        {submitting
                            ? <><i className="icofont-spinner icofont-spin" style={{ marginRight: 8 }}></i>Sending...</>
                            : 'Send Now'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const selectStyle        = { width: '100%', background: '#fff', border: '1px solid #f0f0f0', padding: '10px', marginBottom: '20px', color: '#999', fontSize: '14px', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23f55b14' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', cursor: 'pointer', outline: 'none' };
const dropzoneStyle      = { border: '2px dashed #e5e7eb', borderRadius: '10px', padding: '24px 20px', cursor: 'pointer', transition: 'all 0.25s ease', background: '#fafafa' };
const dropzoneActiveStyle  = { border: '2px dashed #f55b14', background: '#fff5f0' };
const dropzoneSuccessStyle = { border: '2px solid #f55b14', background: '#fff9f7', cursor: 'default' };
const dropPlaceholderStyle = { display: 'flex', alignItems: 'center', gap: 16 };
const uploadIconStyle    = { fontSize: 32, color: '#f55b14', flexShrink: 0 };
const uploadTitleStyle   = { margin: 0, fontSize: 14, color: '#374151', fontWeight: 500 };
const uploadHintStyle    = { margin: '4px 0 0', fontSize: 12, color: '#9ca3af' };
const filePreviewStyle   = { display: 'flex', alignItems: 'center', gap: 14 };
const fileIconStyle      = { fontSize: 30, color: '#f55b14', flexShrink: 0 };
const thumbStyle         = { width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 };
const fileInfoStyle      = { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 };
const fileNameStyle      = { fontSize: 14, fontWeight: 600, color: '#131e3c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const fileSizeStyle      = { fontSize: 12, color: '#9ca3af', marginTop: 2 };
const removeButtonStyle  = { background: '#fee2e2', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', fontSize: 13, flexShrink: 0 };
const errorStyle         = { color: '#ef4444', fontSize: 13, marginTop: 8, display: 'flex', alignItems: 'center' };

export default ContactForm;