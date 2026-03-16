import React from 'react';
import BlogData from '../jsonData/BlogData.json'
import SingleLatestBlog from './SingleLatestBlog';
import LoadMoreProduct from './LoadMoreProduct';

const BlogContent = () => {
    return (
        <>
            <section className="blog-sec pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        {BlogData.map(blog =>
                            <div className="col-sm-12 col-md-6 col-lg-4" key={blog.id}>
                                <SingleLatestBlog blog={blog} />
                            </div>
                        )}
                    </div>
                    <LoadMoreProduct />
                </div>
            </section>
        </>
    );
};

export default BlogContent;