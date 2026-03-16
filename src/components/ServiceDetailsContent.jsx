import React from 'react';
import SidebarCategory from './SidebarCategory';
import { HashLink as Link } from 'react-router-hash-link';
import serviceDetailsThumb from '/img/service/service_details.jpg'
import ServiceDetailsData from '../jsonData/ServiceDetailsData.json'
import RelatedServiceData from '../jsonData/RelatedServiceData.json'
import SingleServiceInfo from './SingleServiceInfo';
import SingleRelatedPost from './SingleRelatedPost';

const ServiceDetailsContent = () => {
    return (
        <>
            <section className="service-details-page pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="sidebar">
                                <div className="service-cat-widget">
                                    <h2 className="widget-title">Service Category</h2>
                                    <SidebarCategory />
                                </div>
                                <div className="brochures-widget">
                                    <h2 className="widget-title">Brochure</h2>
                                    <ul>
                                        <li><Link to="#"><i className="icofont-file-pdf me-2"></i> Download.Pdf<span><i className="icofont-download-alt"></i></span></Link></li>
                                        <li><Link to="#"><i className="icofont-file-document me-2"></i> Download.Doc<span><i className="icofont-download-alt"></i></span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="service-details">
                                <div className="service-details-thumb">
                                    <img src={serviceDetailsThumb} alt="serviceDetails" />
                                </div>
                                <h2>Repair Technology Eos no luptatum incorrupte. Ex dicant mucius pro, ignota detraxit mnesarchum sed cu. Vim no affert eligendi. </h2>
                                <p>Eos no luptatum incorrupte. Ex dicant mucius pro, ignota detraxit mnesarchum sed cu. Vim no affert eligendi. Habeo efficiantur liberavisse nam ea. Eu est animal facilisis, sea ubique placerat in. Nonumy fierent vel ut, cu mea errem nullam facilisi.</p>
                                <div className="row">
                                    {ServiceDetailsData.map(serviceInfo =>
                                        <div className="col-md-6" key={serviceInfo.id}>
                                            <SingleServiceInfo serviceInfo={serviceInfo} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="related-service">
                                <div className="related-service-title">
                                    <div className="col-md-12">
                                        <div className="sec-title">
                                            <h1>Related Service</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {RelatedServiceData.map(relatedPost =>
                                        <div className="col-md-6 col-sm-12 related-service-inner" key={relatedPost.id}>
                                            <SingleRelatedPost relatedPost={relatedPost} />
                                        </div>
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

export default ServiceDetailsContent;