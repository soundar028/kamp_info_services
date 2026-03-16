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
                                    <li><i className="icofont-phone"></i><a href="tel:+00 0123456789">+00 0123456789</a></li>
                                    <li><i className="icofont-mail"></i><a href="mailto:info@finixpa.com">info@finixpa.com</a></li>
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