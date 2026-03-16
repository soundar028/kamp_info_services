import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ProjectDetailsContent from '../components/ProjectDetailsContent';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ProjectDetails = () => {
    return (
        <>
            <Header parentMenu='project' />
            <Breadcrumb pageTitle="Project Details" />
            <ProjectDetailsContent />
            <Footer />
        </>
    );
};

export default ProjectDetails;