import React from 'react';
import TestimonialData from '../jsonData/TestimonialData.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination } from 'swiper';
import SingleTestimonial from './SingleTestimonial';

const Testimonial = () => {
    return (
        <>
            <section className="testimonial-v1-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="sec-title">
                                <h1>What Say Our Client</h1>
                                <p>Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut. Elit massa dui, leo enim magna. Cursus maecenas cubilia, ac nonummy, egestas mauris .</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="testimonial-v1-all">
                                <Swiper
                                    modules={[Keyboard, Autoplay, Pagination]}
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true
                                    }}
                                    loop={true}
                                    keyboard={{
                                        enabled: true,
                                    }}
                                    breakpoints={{
                                        220: {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        }
                                    }}
                                >
                                    {TestimonialData.map(testimonial =>
                                        <SwiperSlide key={testimonial.id}>
                                            <SingleTestimonial testimonial={testimonial} />
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonial;