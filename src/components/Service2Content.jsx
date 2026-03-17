import React from 'react';
import WhatWeDoData from '../jsonData/WhatWeDoData.json'
import SingleWhatWeDo from './SingleWhatWeDo';
import Pagination from './Pagination';

const Service2Content = () => {
    return (
        <>
            <section className="what-we-do-crousel-sec pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        {WhatWeDoData.map(ourService =>
                            <div className="col-md-4 col-sm-6" key={ourService.id}>
                                <SingleWhatWeDo ourService={ourService} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Service2Content;