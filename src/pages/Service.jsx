import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ServiceContent from '../components/ServiceContent';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Service = () => {
    return (
        <>
            <Header parentMenu='service' />
            <Breadcrumb pageTitle="Service Page 1" />
            <ServiceContent />
            <Footer />
        </>
    );
};

export default Service;