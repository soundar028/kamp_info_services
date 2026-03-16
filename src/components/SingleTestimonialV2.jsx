import React from 'react';

const SingleTestimonialV2 = ({ testimonial }) => {
    const { image, name, text } = testimonial;

    return (
        <>
            <div className="single-testimonial">
                <div className="testimonial-comment-box">
                    <img src={`img/testimonial/${image}`} alt="person" />
                </div>
                <div className="testimonial-comment-desc">
                    <h2>{name}</h2>
                    <p>{text}</p>
                    <span className="client-rating">
                        <i className="icofont-star"></i>
                        <i className="icofont-star"></i>
                        <i className="icofont-star"></i>
                        <i className="icofont-star"></i>
                        <i className="icofont-star"></i>
                    </span>
                </div>
            </div>
        </>
    );
};

export default SingleTestimonialV2;