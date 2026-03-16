import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import ContactContent from '../components/ContactContent';
import Header from '../components/Header';

const Contact = () => {
    return (
        <>
            <Header />
            <Breadcrumb pageTitle="Contact Us" />
            <ContactContent />
            <Footer />
        </>
    );
};

export default Contact;