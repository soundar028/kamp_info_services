import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ServiceDetailsContent from '../components/ServiceDetailsContent';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ServiceDetails = () => {
    return (
        <>
            <Header parentMenu='service' />
            <ServiceDetailsContent />
            <Footer />
        </>
    );
};

export default ServiceDetails;