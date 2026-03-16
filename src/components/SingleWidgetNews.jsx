import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const SingleWidgetNews = ({ news }) => {
    const { imageMini, title, author, date } = news;

    return (
        <>
            <div className="media">
                <div className="relative-post">
                    <div className="relative-post-thumb">
                        <Link to="#"><img src={`img/blog/${imageMini}`} alt="newsImage" /></Link>
                    </div>
                    <div className="media-body">
                        <div className="single_r_dec">
                            <h3><Link to="#">{title}</Link></h3>
                            <ul>
                                <li><Link to="#"> by {author}</Link></li>
                                <li><Link to="#">{date}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleWidgetNews;