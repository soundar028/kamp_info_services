import React from 'react';
import BlogData from '../jsonData/BlogData.json'
import SingleLatestBlog from './SingleLatestBlog';

const LatestBlog = () => {
    return (
        <>
            <section className="blog-sec pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="sec-title">
                                <h1>Our Latest Blog</h1>
                                <p>Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut. Elit massa dui, leo enim magna. Cursus maecenas cubilia, ac nonummy, egestas mauris .</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {BlogData.slice(0, 3).map(blog =>
                            <div className="col-sm-12 col-lg-4" key={blog.id}>
                                <SingleLatestBlog blog={blog} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LatestBlog;