import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ProjectContent from '../components/ProjectContent';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Project = () => {
    return (
        <>
            <Header parentMenu='project' />
            <Breadcrumb pageTitle="Project Page" />
            <ProjectContent />
            <Footer />
        </>
    );
};

export default Project;