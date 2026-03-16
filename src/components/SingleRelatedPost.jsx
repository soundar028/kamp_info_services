import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const SingleRelatedPost = ({ relatedPost }) => {
    const { image, icon, title, text } = relatedPost;

    return (
        <>
            <div className="media">
                <div className="service-thumb">
                    <Link to="/service-details#"><img src={`img/service/${image}`} alt="serviceImage" /></Link>
                    <div className="service-icon"></div>
                </div>
                <div className="service-inner-text">
                    <div className="media">
                        <div className="media-left">
                            <div className="service_icon">
                                <i className={icon}></i>
                            </div>
                        </div>
                        <div className="media-body">
                            <h2><Link to="/service-details#">{title}</Link></h2>
                        </div>
                    </div>
                    <p>{text}</p>
                    <Link to="#" className="/service-read-more#">Read More <i className="fa fa-angle-right"></i></Link>
                </div>
            </div>
        </>
    );
};

export default SingleRelatedPost;