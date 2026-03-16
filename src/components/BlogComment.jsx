import React from 'react';
import comment1 from '/img/blog/commenter_1.jpg'
import comment2 from '/img/blog/commenter_2.jpg'

const BlogComment = () => {
    return (
        <>
            <div className="commenter-sec">
                <h2>02 comments</h2>
                <div className="media d-block d-sm-flex me-3">
                    <img className="" src={comment1} alt="commentPerson" />
                    <div className="media-body">
                        <h3 className="comment-author">Joshua</h3>
                        <span className="comment-author-designation">industrial officer</span>
                        <p>Lorem ipsum dolor sit amet, suscipit suscipit pellentesque ultricies fermentum, pellentesque ante tellus id non nunc, ut dui lacus iaculis condimentum, luctus vel porta arcu massa dignissim elit.</p>
                        <div className="media d-block d-sm-flex pr-3 mt-sm-5">
                            <img src={comment2} alt="commentPerson" />
                            <div className="media-body">
                                <h3 className="comment-author">Benjamin</h3>
                                <span className="comment-author-designation">CO-Founder</span>
                                <p>Lorem ipsum dolor sit amet, suscipit suscipit pellentesque ultricies fermentum, pellentesque ante tellus id non nunc, ut dui lacus iaculis condimentum, luctus vel porta arcu massa dignissim elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogComment;