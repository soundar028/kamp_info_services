import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import projectDetailsThumb from '/img/projects/project-details.jpg'
import projectThumb1 from '/img/projects/project-col-1.jpg'
import projectThumb2 from '/img/projects/project-col-2.jpg'

const ProjectDetailsContent = () => {
    return (
        <>
            <section className="project-details-page pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="project-details-img">
                                <img src={projectDetailsThumb} alt="projectDetailsThumb" />
                                <div className="project-details-list">
                                    <div className="project-details-list-single">
                                        <div className="project-details-list-text">
                                            <h2>Starting date</h2>
                                            <span>25 January 2023</span>
                                        </div>
                                    </div>
                                    <div className="project-details-list-single">
                                        <div className="project-details-list-text">
                                            <h2>Ending date</h2>
                                            <span>25 February 2023</span>
                                        </div>
                                    </div>
                                    <div className="project-details-list-single">
                                        <div className="project-details-list-text">
                                            <h2>Project Category</h2>
                                            <span>Oil & Gas services</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="project-details-desc">
                                <h2><Link to="#">Mei facer causae et, ridens eruditi indoctum ut qui. Unum iisque disputando per ei</Link></h2>
                                <p>Mei facer causae et, ridens eruditi indoctum ut qui. Unum iisque disputando per ei, cu everti adipiscing accommodare usu. Ei vel iisque quaestio scriptorem, te sea atqui viris quaestio. Ad per iracundia suscipiantur, his postea gubergren ex, vel eirmod detracto dissentiunt an. Sed te dolor commodo tamquam, menandri adversarium id est, ad mei quas justo.</p>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="project-details-column-text">
                                        <img src={projectThumb1} alt="projectThumb1" />
                                        <h2>timeam prompta ea eos. Error corpora suavitate.</h2>
                                        <p>Has posse simul oportere no, cum malorum omittantur ad. Eum noster option cu, at eum ubique dolores detracto. Porro atomorum an est, sea tantas invidunt id. No probo labores vivendum sit. Laudem definiebas disputationi no sit, et qui saepe antiopam deterruisset, et eros utinam duo.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="project-details-column-text">
                                        <img src={projectThumb2} alt="projectThumb2" />
                                        <h2>research for new growing industry</h2>
                                        <p>Has posse simul oportere no, cum malorum omittantur ad. Eum noster option cu, at eum ubique dolores detracto. Porro atomorum an est, sea tantas invidunt id. No probo labores vivendum sit. Laudem definiebas disputationi no sit, et qui saepe antiopam deterruisset, et eros utinam duo.</p>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="project-details-column-text">
                                        <h2>Conceptam democritum eu mea, quot comprehensam sea in. Sit utamur mediocrem eu</h2>
                                        <p>Clita efficiantur ne pri, ubique praesent nam ea. Argumentum eloquentiam ad duo. Id eripuit fuisset argumentum pri, ne sea illum dolorem disputando. Labores utroque eu qui. At feugiat ceteros inimicus usu, usu meliore sententiae ad, error quidam essent mei ad. Eum at meis omittam ponderum. Eu error nominavi iracundia usu, ne usu tantas constituto. Maiestatis persequeris vis eu. An est modo tantas maiestatis, pro nonumes mandamus consequat ea, id qui dicta laboramus. Per nihil voluptatum ad. In mei ubique noluisse, nisl utamur definiebas nam eu, ei lorem dictas eam.</p>
                                        <p>Conceptam democritum eu mea, quot comprehensam sea in. Sit utamur mediocrem eu, feugait conceptam deseruisse ius ei. Pro eros ferri quidam ea, eu has consul essent efficiendi.</p>
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

export default ProjectDetailsContent;