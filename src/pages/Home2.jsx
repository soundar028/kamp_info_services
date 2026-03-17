import React from 'react';
import Banner from '../components/Banner';
import WhatWeDo from '../components/WhatWeDo';
import CallToAction from '../components/CallToAction';
import LatestProject from '../components/LatestProject';
import TeamV2 from '../components/TeamV2';
import TestimonialCountUp from '../components/TestimonialCountUp';
import LatestBlog from '../components/LatestBlog';
import Partner from '../components/Partner';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home2 = () => {
    return (
        <>
            <Header parentMenu='home' />
            <Banner />
            <WhatWeDo />
            <CallToAction />
            <TestimonialCountUp />
            <Partner />
            <Footer />
        </>
    );
};

export default Home2;