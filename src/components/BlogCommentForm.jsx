import React from 'react';
import { toast } from 'react-toastify';

const BlogCommentForm = () => {

    const handleComment = (event) => {
        event.preventDefault()
        event.target.reset()
        toast.success("Thanks For Your Comment")
    }

    return (
        <>
            <div className="contact-field">
                <h3 className="comment-reply-title">Leave a comment</h3>
                <form className="comment-form" onSubmit={handleComment}>
                    <p className="comment-notes"><span id="email-notes">Your email address will not be published.</span> Required fields are marked <span className="required">*</span></p>
                    <div className="row form-fields">
                        <p className="comment-author col-md-4">
                            <input placeholder="Your Name*" name="author" type="text" autoComplete='off' required />
                        </p>
                        <p className="author-email col-md-4">
                            <input placeholder="E-mail*" name="email" type="text" autoComplete='off' required />
                        </p>
                        <p className="author-website col-md-4">
                            <input placeholder="Your Website*" name="url" type="text" autoComplete='off' required />
                        </p>
                    </div>
                    <p className="comment-form">
                        <textarea placeholder="Write Your Comment*" name="comment" rows="8" aria-required="true" autoComplete='off' required ></textarea>
                    </p>
                    <p className="form-submit">
                        <button className="submit" type="submit" name='submit'>Post Comment</button>
                    </p>
                </form>
            </div>
        </>
    );
};

export default BlogCommentForm;