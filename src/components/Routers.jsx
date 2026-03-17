import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home1 from '../pages/Home1';
import Home2 from '../pages/Home2';
import About from '../pages/About';
import Service from '../pages/Service';
import Service2 from '../pages/Service2';
import ServiceDetails from '../pages/ServiceDetails';
import Project from '../pages/Project';
import ProjectDetails from '../pages/ProjectDetails';
import Blog from '../pages/Blog';
import BlogDetails from '../pages/BlogDetails';
import Contact from '../pages/Contact';
import Error404 from '../pages/Error404';

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home2 />}></Route>
                <Route path="/home" element={<Home2 />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/service" element={<Service2 />}></Route>
                <Route path="/service-details" element={<ServiceDetails />}></Route>
                <Route path="/blog" element={<Blog />}></Route>
                <Route path="/blog-details" element={<BlogDetails />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="*" element={<Error404 />}></Route>
            </Routes>
        </>
    );
};

export default Routers;