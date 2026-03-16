import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import LatestProjectData from '../jsonData/LatestProjectData.json'
import SingleLatestProject from './SingleLatestProject';

const LatestProject = () => {
    return (
        <>
            <section className="latest-project-sec pt-100 pb-70">
                <div className="container">
                    <div className="row latest-project-title-sec">
                        <div className="col-md-4">
                            <div className="latest-project-title">
                                <span>Latest Projects</span>
                                <h1>Completed Project</h1>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="latest-project-subtitle">
                                <p>Lorem ipsum dolor sit amet, usu suscipit sadipscing et, ei sale invidunt deseruisse ius. Vivendum expetendis at has. Dolore suavitate eloquentiam eum id, usu ad oratio ponderum</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="latest-project-button">
                                <Link to="#">View All Project <i className="icofont-long-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {LatestProjectData.map(project =>
                            <div className="col-lg-3 col-md-6" key={project.id}>
                                <SingleLatestProject project={project} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LatestProject;