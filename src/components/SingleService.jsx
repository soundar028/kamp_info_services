import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const SingleService = ({ service }) => {
    const { image, icon, title, text } = service;

    return (
        <>
            <div className="service-item">
                <div className="inner">
                    <div className="media">
                        <div className="service-thumb">
                            <Link to="/service-details#">
                                <img src={`/img/service/${image}`} alt="service" />
                            </Link>
                        </div>
                        <div className="service-inner-text">
                            <div className="media-wrap d-flex align-items-center">
                                <div className="media-left me-2 mb-2">
                                    <div className="service_icon">
                                        <i className={icon}></i>
                                    </div>
                                </div>
                                <div className="media-body">
                                    <h2><Link to="/service-details#">{title}</Link></h2>
                                </div>
                            </div>
                            <p>{text}</p>
                            <Link to="/service-details#" className="service-read-more">Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleService;