import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Service2Content from '../components/Service2Content';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Service2 = () => {
    return (
        <>
            <Header parentMenu='service' />
            <Breadcrumb pageTitle="Service Page" />
            <Service2Content />
            <Footer />
        </>
    );
};

export default Service2;