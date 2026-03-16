import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const CallToAction = () => {
    return (
        <>
            <section className="call-to-action-sec">
                <div className="call-to-action-overlay"></div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-8">
                            <div className="call-to-action-text">
                                <h2>contact with us for customer support</h2>
                                <p>We provide 24/7 hours support.</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="call-to-action-text">
                                <Link to="/contact#" className="btn">get support <i className="icofont-thin-double-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CallToAction;