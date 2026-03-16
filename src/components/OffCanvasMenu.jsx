import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import logoMini from '/img/logo/logo.png'

const OffCanvasMenu = () => {

    const [iconToggle1, setIconToggle1] = useState(true)
    const [iconToggle2, setIconToggle2] = useState(true)
    const [iconToggle3, setIconToggle3] = useState(true)
    const [iconToggle4, setIconToggle4] = useState(true)

    const location = useLocation();

    return (
        <>
            <Link className="offcanvas-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa-solid fa-bars"></i></Link>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <Link to="/#"><img src={logoMini} alt="logo" /></Link>
                    <button type="button" className='offcanvasClose' data-bs-dismiss="offcanvas" aria-label="Close"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="offcanvas-body">
                    <nav className="navbar">
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" aria-current="page" to="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setIconToggle1(!iconToggle1)}>
                                            Home
                                            {iconToggle1 ? <i className="fa-solid fa-plus"></i> : <i className="fa-solid fa-minus"></i>}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className={location.pathname === '/' ? 'dropdown-item active' : 'dropdown-item'} to="/#">Home Version 1</Link>
                                            </li>
                                            <li>
                                                <Link className={location.pathname === '/home-2' ? 'dropdown-item active' : 'dropdown-item'} to="/home-2#">Home Version 2</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'} to="/about#">About</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="/service#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setIconToggle2(!iconToggle2)}>
                                            Service
                                            {iconToggle2 ? <i className="fa-solid fa-plus"></i> : <i className="fa-solid fa-minus"> </i>}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className={location.pathname === '/service' ? 'dropdown-item active' : 'dropdown-item'} to="/service#">Service</Link>
                                            </li>
                                            <li>
                                                <Link className={location.pathname === '/service-2' ? 'dropdown-item active' : 'dropdown-item'} to="/service-2#">Service V2 Page</Link>
                                            </li>
                                            <li>
                                                <Link className={location.pathname === '/service-details' ? 'dropdown-item active' : 'dropdown-item'} to="/service-details#">Service Details</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="/project#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setIconToggle3(!iconToggle3)}>
                                            Project
                                            {iconToggle3 ? <i className="fa-solid fa-plus"></i> : <i className="fa-solid fa-minus"></i>}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className={location.pathname === '/project' ? 'dropdown-item active' : 'dropdown-item'} to="/project#">Project</Link>
                                            </li>
                                            <li>
                                                <Link className={location.pathname === '/project-details' ? 'dropdown-item active' : 'dropdown-item'} to="/project-details#">Project Details</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="/blog#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setIconToggle4(!iconToggle4)}>
                                            Blog
                                            {iconToggle4 ? <i className="fa-solid fa-plus"></i> : <i className="fa-solid fa-minus"></i>}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className={location.pathname === '/blog' ? 'dropdown-item active' : 'dropdown-item'} to="/blog#">Blog</Link>
                                            </li>
                                            <li>
                                                <Link className={location.pathname === '/blog-details' ? 'dropdown-item active' : 'dropdown-item'} to="/blog-details#">Blog Details</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'} to="/contact#">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default OffCanvasMenu;