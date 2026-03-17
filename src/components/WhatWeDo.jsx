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
                                <h1>We provide world best industries & factorial Business Solution</h1>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="what-we-do-short-description">
                                <p>Nibh wisi utamur no vim, ex usu posidonium temporibus. Cu cum fierent vivendum, stet accusam ad qui, mei dicta fuisset salutandi ex. Cetero mandamus eos te. Ad his eripuit ullamcorper, ei fugit mentitum definitiones ius, dolorem dissentiunt sit id. Doctus diceret pro ad, labores adipisci cum ne.</p>
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