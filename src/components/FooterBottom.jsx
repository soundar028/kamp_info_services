import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const FooterBottom = () => {
    return (
        <>
            <div className="footer-bottom-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="copy-right">
                                <span>&copy; {(new Date().getFullYear())} Finixpa. All Rights Reserved </span>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="site-developer">
                                <span>Design by <Link to="#">Theme Earth</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FooterBottom;