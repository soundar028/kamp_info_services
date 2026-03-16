import React from 'react';

const SingleChooseUs = ({ choose }) => {
    const { title, text, icon } = choose;

    return (
        <>
            <div className="why-choose-v1-single">
                <div className="media d-flex">
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

export default SingleChooseUs;