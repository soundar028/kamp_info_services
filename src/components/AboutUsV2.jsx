import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import aboutThumb from '/img/about/about.jpg'

const AboutUsV2 = () => {
    return (
        <>
            <section className="about-us-sec pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-desc">
                                <div className="sec-title">
                                    <h1>About Our Company</h1>
                                </div>
                                <p>Vel id noluisse delicatissimi, aeque reformidans per ea, sed utamur quaestio eu. Vim quem platonem an, quis alia cotidieque te pri, te legendos gubergren contentiones mea. Sumo tempor eam et.</p>
                                <p>Malis aliquam inermis eu est. Sea ei noster option, nec possit evertitur instructior no.</p>
                                <div className="read-more-btn">
                                    <Link to="/contact#">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="about-us-img">
                                <img src={aboutThumb} alt="about" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUsV2;