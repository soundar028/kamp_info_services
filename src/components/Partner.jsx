import React from 'react';
import PartnerData from '../jsonData/PartnerData.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper';

const Partner = () => {

    return (
        <>
            <div className="all-partner-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="all-partner">
                                <Swiper
                                    modules={[Keyboard, Autoplay]}
                                    slidesPerView={4}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
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
                                        480: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 20,
                                        },
                                        992: {
                                            slidesPerView: 4,
                                            spaceBetween: 20,
                                        },
                                        1200: {
                                            slidesPerView: 5,
                                            spaceBetween: 20,
                                        }
                                    }}
                                >
                                    {PartnerData.map(partner =>
                                        <SwiperSlide key={partner.id}>
                                            <div className="single-partner">
                                                <img src={`img/partner/${partner.image}`} alt="partner" />
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Partner;