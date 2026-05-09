import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Link as RouterLink } from 'react-router-dom';
import footerLogo from '/img/logo/ft-logo.png'
import SocialShare from './SocialShare';
import FooterBottom from './FooterBottom';

const serviceLinks = [
    { label: 'Supplier Selection',          slug: 'supplier-selection' },
    { label: 'Enquiry Handling',            slug: 'rfq-rfi-nda-management' },
    { label: 'Negotiations & Closure',      slug: 'negotiations-commercial-closure' },
    { label: 'Supply Chain Management',     slug: 'supply-chain-management' },
    { label: 'Sourcing : HPDC/GDC/LPDC',   slug: 'die-casting-sourcing' },
];

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-overlay"></div>
                <div className="footer-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-widget-one">
                                    <h2 className='footer-title-one'>Company Info</h2>
                                    <Link to="/#" className="footer-logo"><img src={footerLogo} alt="footerLogo" /></Link>
                                    <p>
                                        KAMP INFO SERVICES is a modern sourcing service designed to transform 
                                        procurement into a strategic advantage. We connect businesses with 
                                        verified suppliers for high-quality machined aluminum castings.
                                    </p>
                                    <div className="footer-social">
                                        <SocialShare />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-widget-two footer-widget-menu">
                                    <h2>our solutions</h2>
                                    <ul>
                                        {serviceLinks.map(({ label, slug }) => (
                                            <li key={slug}>
                                                <RouterLink
                                                    to="/service-details"
                                                    state={{ slug }}
                                                >
                                                    {label}
                                                </RouterLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-widget-four">
                                    <h2>contact info</h2>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-google-map"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <span>520, Srisai Murali, V.K.V Nagar,</span>
                                                <span>N.G.G.O Colony, Thudiyalur, Coimbatore - 641021</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-email"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <a href="mailto:info@kampinfoservices.com">info@kampinfoservices.com</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-telephone"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <a href="tel:+918220653952">+91 82206 53952</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterBottom />
            </footer>
        </>
    );
};

export default Footer;