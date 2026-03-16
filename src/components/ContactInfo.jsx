import React from 'react';

const ContactInfo = () => {
    return (
        <>
            <div className="contact-info">
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <i className="icofont-map-pins"></i>
                    </div>
                    <div className="contact-info-text">
                        <h2>address</h2>
                        <span>Californiya , United State</span>
                    </div>
                </div>
            </div>
            <div className="contact-info">
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <i className="icofont-email"></i>
                    </div>
                    <div className="contact-info-text">
                        <h2>e-mail</h2>
                        <span> <a href="mailto:company@gmail.com">company@gmail.com</a> </span>
                        <span> <a href="mailto:yourmail@gmail.com">yourmail@gmail.com</a> </span>
                    </div>
                </div>
            </div>
            <div className="contact-info">
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <i className="icofont-wall-clock"></i>
                    </div>
                    <div className="contact-info-text">
                        <h2>office time</h2>
                        <span>Mon - Thu 9:00 am - 4.00 pm</span>
                        <span>Thu - Sat 10.00 pm - 5.00 pm</span>
                        <span>Sunday Office Holiday</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInfo;