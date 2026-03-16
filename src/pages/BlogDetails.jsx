import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import BlogDetailsContent from '../components/BlogDetailsContent';
import Header from '../components/Header';

const BlogDetails = () => {
    return (
        <>
            <Header parentMenu='blog' />
            <Breadcrumb pageTitle="Blog Details Page" />
            <BlogDetailsContent />
            <Footer />
        </>
    );
};

export default BlogDetails;