import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const SingleLatestBlog = ({ blog }) => {
    const { image, date, author, comment, title, text } = blog;

    return (
        <>
            <div className="single-blog">
                <div className="single-blog-img">
                    <img src={`img/blog/${image}`} alt="blog" />
                </div>
                <div className="single-blog-dsc">
                    <ul>
                        <li><i className="icofont-clock-time"></i>{date}</li>
                        <li><i className="icofont-ui-user"></i>{author}</li>
                        <li><i className="icofont-comment"></i>{comment}</li>
                    </ul>
                    <h2 className="blg-title"><Link to="/blog-details#">{title}</Link></h2>
                    <p>{text}</p>
                    <Link to="/blog-details#" className="read-more-button">Learn More<i className="icofont-long-arrow-right"></i></Link>
                </div>
            </div>
        </>
    );
};

export default SingleLatestBlog;