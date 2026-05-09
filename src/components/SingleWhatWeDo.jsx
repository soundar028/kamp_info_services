import React from 'react';
import { Link } from 'react-router-dom';

const SingleWhatWeDo = ({ ourService }) => {
    const { icon, text, title, title2, slug } = ourService;

    return (
        <>
            <div className="what-we-do-single-inner">
                <div className="what-we-do-inner-icon">
                    <i className={icon}></i>
                </div>
                <div className="what-we-do-inner-desc">
                    <h2>
                        <Link to="/service-details" state={{ slug }}>
                            <span>{title}</span> {title2}
                        </Link>
                    </h2>
                    <p>{text}</p>
                    <Link to="/service-details" state={{ slug }} className="what-we-do-button">
                        Learn More <i className="icofont-long-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleWhatWeDo;