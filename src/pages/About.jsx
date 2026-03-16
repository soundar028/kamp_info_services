import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AboutUsV2 from '../components/AboutUsV2';
import TeamV2 from '../components/TeamV2';
import TestimonialCountUp from '../components/TestimonialCountUp';
import Footer from '../components/Footer';
import Header from '../components/Header';

const About = () => {
    return (
        <>
            <Header />
            <Breadcrumb pageTitle="About Page" />
            <AboutUsV2 />
            <TeamV2 />
            <TestimonialCountUp />
            <Footer />
        </>
    );
};

export default About;