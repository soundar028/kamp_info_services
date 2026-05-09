import React from 'react';
import WhatWeDoData from '../jsonData/WhatWeDoData.json'
import SingleWhatWeDo from './SingleWhatWeDo';

const WhatWeDo = () => {
    return (
        <>
            <section className="what-we-do-crousel-sec pt-100 pb-70">
                <div className="container">
                    <div className="row what-we-do-title-inner">
                        <div className="col-md-6">
                            <div className="what-we-do-title">
                                <h1>Transforming Procurement into a Strategic Advantage</h1>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="what-we-do-short-description">
                                <p>
                                    We connect businesses with a panel of verified suppliers, 
                                    streamlining negotiations and delivering real-time insights 
                                    to cut costs and speed up decision-making for machined 
                                    aluminum castings in automotive and industrial sectors.
                                </p>
                            </div>
                        </div>
                    </div>
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

export default WhatWeDo;