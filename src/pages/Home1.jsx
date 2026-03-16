import React from 'react';
import Banner from '../components/Banner';
import AboutUs from '../components/AboutUs';
import WhyChooseUs from '../components/WhyChooseUs';
import CallToAction from '../components/CallToAction';
import ProjectGallery from '../components/ProjectGallery';
import TeamHeader from '../components/TeamHeader';
import Team from '../components/Team';
import Testimonial from '../components/Testimonial';
import LatestBlog from '../components/LatestBlog';
import Footer from '../components/Footer';
import Services from '../components/Services';
import Header from '../components/Header';

const Home1 = () => {
    return (
        <>
            <Header parentMenu='home' />
            <Banner />
            <AboutUs />
            <Services />
            <WhyChooseUs />
            <CallToAction />
            <ProjectGallery />
            <TeamHeader />
            <Team />
            <Testimonial />
            <LatestBlog />
            <Footer />
        </>
    );
};

export default Home1;