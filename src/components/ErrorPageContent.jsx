import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const ErrorPageContent = () => {
    return (
        <>
            <section className="error-page-area pt-100 pb-100 text-center d-flex align-items-center ">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="error-box">
                                <h1>404</h1>
                                <h2>Oops! That page can’t be found.</h2>
                                <p>
                                    The page you are looking for might have been removed had its name changed or its temporarily unavailable.
                                </p>
                                <Link className="home-btn mt-2" to="/#">Back to home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ErrorPageContent;