import React from 'react';

const SingleServiceInfo = ({ serviceInfo }) => {
    const { icon, title, text } = serviceInfo;

    return (
        <>
            <div className="faq-single">
                <div className="media">
                    <div className="media-left">
                        <div className="icon">
                            <i className={icon}></i>
                        </div>
                    </div>
                    <div className="media-body">
                        <h2>{title}</h2>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleServiceInfo;