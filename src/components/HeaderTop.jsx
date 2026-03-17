import React from 'react';
import SocialShare from './SocialShare';

const HeaderTop = () => {
    return (
        <>
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 d-none d-lg-block">
                            <div className="header-left">
                                <span className="social-title me-2">Need Any Help?</span>
                                <ul>
                                    <li><i className="icofont-phone"></i><a href="tel:+91 8220653952">+91 82206 53952</a></li>
                                    <li><i className="icofont-mail"></i><a href="mailto:info@kampinfoservices.com">info@kampinfoservices.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="header-right-div">
                                <div className="social-profile">
                                    <span className="social-title">Follow Us</span>
                                    <SocialShare />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTop;