import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import footerLogo from '/img/logo/ft-logo.png'
import SocialShare from './SocialShare';
import FooterBottom from './FooterBottom';

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
                                    <p>Lorem ipsum dolor sit amet, choro tamquam vim id, aliquip vivendo repudiare vim te, et his case vidisse tractatos. Nec bonorum iudicabit eloquentiam eu, at reque laboramus quo.</p>
                                    <div className="footer-social">
                                        <SocialShare />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-widget-two footer-widget-menu">
                                    <h2>our solutions</h2>
                                    <ul>
                                        <li><Link to="#">Automotive Industry</Link></li>
                                        <li><Link to="#">Healthcare Research</Link></li>
                                        <li><Link to="#">Electrical Industry</Link></li>
                                        <li><Link to="#">Hydraulic Industry</Link></li>
                                        <li><Link to="#">Pneumatic Valves</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-widget-four">
                                    <h2>contact form</h2>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-google-map"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <span>520, Srisai Murali, V.K.V Nagar, N.G.G.O Colony, Thudiyalur</span>
                                                <span>Coimbatore - 641021</span>
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
                                                <a href="tel:+91 8220653952">+91 82206 53952</a>
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