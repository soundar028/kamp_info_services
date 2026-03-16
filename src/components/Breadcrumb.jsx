import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Breadcrumb = (props) => {
    const { pageTitle } = props;

    return (
        <>
            <section className="page-heading-sec">
                <div className="images-overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-heading">
                                <h1>{pageTitle ? pageTitle : "404 Error Page"}</h1>
                            </div>
                            <div className="page-breadcrumb-inner">
                                <div className="page-breadcrumb">
                                    <div className="breadcrumb-list">
                                        <ul>
                                            <li><Link to="/#">Home</Link></li>
                                            <li><Link to="#">{pageTitle ? pageTitle : "404 Error Page"}</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Breadcrumb;