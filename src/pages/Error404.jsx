import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Header from '../components/Header';
import ErrorPageContent from '../components/ErrorPageContent';
import Footer from '../components/Footer';

const Error404 = () => {
    return (
        <>
            <Header parentMenu='home' />
            <Breadcrumb pageTitle="404 Error Page" />
            <ErrorPageContent />
            <Footer />
        </>
    );
};

export default Error404;