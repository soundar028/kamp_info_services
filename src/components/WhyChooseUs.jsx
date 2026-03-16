import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import ModalVideo from 'react-modal-video';
import WhyChooseData from '../jsonData/WhyChooseData.json'
import SingleChooseUs from './SingleChooseUs';

const WhyChooseUs = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <section className="why-choose-us-v1-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="video-play-button">
                                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="7e90gBu4pas" onClose={() => setOpen(false)} />
                                <Link className="mfp-iframe vedio-play" onClick={() => setOpen(true)}>
                                    <i className="icofont-play"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="why-choose-v1">
                                <div className="why-choose-v1-wrap">
                                    <div className="why-choose-v1-title">
                                        <span>Why Choose Us</span>
                                        <h1>Why Trust Our Client</h1>
                                    </div>
                                    {WhyChooseData.map(choose =>
                                        <SingleChooseUs choose={choose} key={choose.id} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhyChooseUs;