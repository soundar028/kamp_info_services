import React from 'react';
import blogDetailsThumb from '/img/blog/blog-details.jpg'
import SidebarCategory from './SidebarCategory';
import BlogCommentForm from './BlogCommentForm';
import WidgetTag from './WidgetTag';
import WidgetNews from './WidgetNews';
import BlogComment from './BlogComment';
import { HashLink as Link } from 'react-router-hash-link';

const BlogDetailsContent = () => {

    const handleSearch = (event) => {
        event.preventDefault()
        event.target.reset()
    }

    return (
        <>
            <section className="blog-sec pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="single-blog">
                                <div className="single-blog-img">
                                    <img src={blogDetailsThumb} alt="blogDetailsThumb" />
                                </div>
                                <div className="single-blog-dsc">
                                    <ul>
                                        <li><i className="icofont-clock-time"></i>28 Jun 2023</li>
                                        <li><i className="icofont-ui-user"></i>Admin</li>
                                        <li><i className="icofont-comment"></i>24</li>
                                    </ul>
                                    <h2 className="blg-title"><Link to="#">Eam vide graece suscipiantur ea, cum ad solet</Link></h2>
                                    <p>Has posse simul oportere no, cum malorum omittantur ad. Eum noster option cu, at eum ubique dolores detracto. Porro atomorum an est, sea tantas invidunt id. No probo labores vivendum sit. Laudem definiebas disputationi no sit, et qui saepe antiopam deterruisset, et eros utinam duo.</p>
                                    <div className="code-text">
                                        <p>Eam vide graece suscipiantur ea, cum ad solet apeirian mnesarchum, has soluta forensibus cu. Reque iudico eum ad. At vivendo lucilius est, an has mentitum perpetua</p>
                                    </div>
                                    <p>Has posse simul oportere no, cum malorum omittantur ad. Eum noster option cu, at eum ubique dolores detracto. Porro atomorum an est, sea tantas invidunt id. No probo labores vivendum sit. Laudem definiebas disputationi no sit, et qui saepe antiopam deterruisset, et eros utinam duo.</p>
                                </div>
                                <BlogComment />
                                <BlogCommentForm />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="sidebar">
                                <div className="search-field">
                                    <form onSubmit={handleSearch}>
                                        <input placeholder="Enter Search Here..." type="text" name='search' autoComplete='off' />
                                        <button type="submit"><i className="icofont-search-2"></i></button>
                                    </form>
                                </div>
                                <div className="widget-archive">
                                    <h1>Blog Category</h1>
                                    <SidebarCategory />
                                </div>
                                <WidgetNews />
                                <WidgetTag />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogDetailsContent;