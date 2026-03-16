import React from 'react';
import { Fade } from 'react-reveal';
import { HashLink as Link } from 'react-router-hash-link';

const SingleBanner = ({ banner }) => {
    const { image, title, text, btn1, btn2, } = banner;

    return (
        <>
            <div className="single-slide" style={{ backgroundImage: `url(/img/banner/${image})` }}>
                <div className="slider-overlay"></div>
                <div className="slider-wrapper">
                    <div className="slider-text">
                        <div className="slider-caption">
                            <Fade bottom>
                                <h1>{title}</h1>
                            </Fade>
                            <Fade top>
                                <p>{text}</p>
                                <ul>
                                    <li><Link to="/about#">{btn1} <i className="icofont-long-arrow-right"></i></Link></li>
                                    <li><Link to="/contact#">{btn2} <i className="icofont-long-arrow-right"></i></Link></li>
                                </ul>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBanner;