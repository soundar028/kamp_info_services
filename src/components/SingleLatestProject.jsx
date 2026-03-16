import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const SingleLatestProject = ({ project }) => {
    const { image, name, meta } = project

    return (
        <>
            <div className="latest-project-inner">
                <div className="latest-project-inner-img">
                    <img src={`/img/projects/${image}`} alt="project" />
                    <div className="latest-project-inner-desc">
                        <div className="latest-project-inner-text">
                            <span>{meta}</span>
                            <h2><Link to="#">{name}</Link></h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleLatestProject;