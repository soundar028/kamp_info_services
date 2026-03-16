import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import BlogContent from '../components/BlogContent';
import Header from '../components/Header';

const Blog = () => {
    return (
        <>
            <Header parentMenu='blog' />
            <Breadcrumb pageTitle="Blog Page" />
            <BlogContent />
            <Footer />
        </>
    );
};

export default Blog;