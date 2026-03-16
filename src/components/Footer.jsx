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
                                        <li><Link to="#">Factory Energy Power</Link></li>
                                        <li><Link to="#">Chemical Research</Link></li>
                                        <li><Link to="#">Expert Mechanical</Link></li>
                                        <li><Link to="#">civil engineering</Link></li>
                                        <li><Link to="#">oil & gas services</Link></li>
                                        <li><Link to="#">Repair Technology</Link></li>
                                        <li><Link to="#">Refinery Petroleum</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="footer-widget-three footer-widget-menu">
                                    <h2>useful link</h2>
                                    <ul>
                                        <li><Link to="/about#">about us</Link></li>
                                        <li><Link to="/project#">latest project</Link></li>
                                        <li><Link to="/about#">faq</Link></li>
                                        <li><Link to="/contact#">Contact Us</Link></li>
                                        <li><Link to="/contact#">site map</Link></li>
                                        <li><Link to="#">trust People</Link></li>
                                        <li><Link to="#">Our Project</Link></li>
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
                                                <span>71 Pilgrim Avenue Chevy Chase</span>
                                                <span>United States</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-email"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <a href="mailto:yourmail@gmail.com">yourmail@gmail.com</a>
                                                <a href="mailto:info@finixpa.com">info@finixpa.com</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-telephone"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <a href="tel:126-7545-9245">126-7545-9245</a>
                                                <a href="tel:254-7494-6494">254-7494-6494</a>
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