import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const AboutTabs = () => {
    return (
        <>
            <ul className="nav nav-pills mb-3 about-tab" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">History</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Mission</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Support</a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    <div className="about-desc">
                        <h1>About Our Company</h1>
                        <p>Established in 1950, Acme Industries emerged as a powerhouse in the industrial sector. With a commitment to innovation and quality, the company quickly gained prominence. Through strategic acquisitions and cutting-edge technologies, Acme expanded its operations globally. Over the years, it has pioneered groundbreaking solutions, revolutionizing manufacturing processes. Today, Acme stands as a trusted industry leader, driven by a rich heritage of excellence and a vision for a sustainable future </p>
                        <p>With a rich heritage of 70 years, our company has evolved from humble beginnings to become a global leader, shaping industries through groundbreaking advancements and strategic partnerships</p>
                        <Link to="#">Read More</Link>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                    <div className="about-desc">
                        <h1>About Our Mission</h1>
                        <p>At Acme Industries, our mission is to empower industries worldwide through relentless innovation and unwavering commitment to excellence. We strive to deliver cutting-edge solutions that optimize productivity, enhance efficiency, and drive sustainable growth. Our goal is to be a trusted partner, shaping the future of industrial advancement with integrity and passion</p>
                        <p>We strive to foster a culture of innovation, collaboration, and sustainability, driving positive change in industries worldwide while upholding the highest ethical standards. Together, we build a better future</p>
                        <Link to="#">Read More</Link>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                    <div className="about-desc">
                        <h1>About Our Support</h1>
                        <p>We are dedicated to providing unparalleled customer support. Our team of highly skilled professionals is available round the clock to address your needs and ensure smooth operations. We offer comprehensive technical assistance, timely maintenance services, and personalized solutions, aiming to exceed your expectations and foster long-term partnerships.</p>
                        <p>Our support team is committed to your success, providing prompt responses, troubleshooting expertise, and continuous training opportunities. Your satisfaction is our priority, and we are here to support you every step of the way.</p>
                        <Link to="#">Read More</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutTabs;