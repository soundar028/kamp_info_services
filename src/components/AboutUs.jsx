import React from 'react';
import AboutTabs from './AboutTabs';
import AboutForm from './AboutForm';

const AboutUs = () => {
    return (
        <>
            <section className="about-sec pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="about-us-v2">
                                <AboutTabs />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <AboutForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;