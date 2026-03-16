import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const SingleWhatWeDo = ({ ourService }) => {
    const { icon, text, title, title2 } = ourService;

    return (
        <>
            <div className="what-we-do-single-inner">
                <div className="what-we-do-inner-icon">
                    <i className={icon}></i>
                </div>
                <div className="what-we-do-inner-desc">
                    <h2><Link to="/service-details#"><span>{title}</span> {title2}</Link></h2>
                    <p>{text}</p>
                    <Link to="/service-details#" className="what-we-do-button">Learn More <i className="icofont-long-arrow-right"></i></Link>
                </div>
            </div>
        </>
    );
};

export default SingleWhatWeDo;