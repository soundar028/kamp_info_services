import React from 'react';
import ServicesData from '../jsonData/ServicesData.json'
import Pagination from './Pagination';
import SingleService from './SingleService';

const ServiceContent = () => {
    return (
        <>
            <section className="service-page-sec pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="service-item">
                            <div className="row">
                                {ServicesData.map(service =>
                                    <div className="col-lg-3 col-md-6" key={service.id}>
                                        <SingleService service={service} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Pagination />
                </div>
            </section>
        </>
    );
};

export default ServiceContent;