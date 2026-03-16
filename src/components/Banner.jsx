import React from 'react';
import BannerData from '../jsonData/BannerData.json'
import SingleBanner from './SingleBanner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay } from 'swiper';
import SwiperCustomNavigation from './SwiperCustomNavigation';

const Banner = () => {

    return (
        <>
            <section className="slider">
                <div className="all-slide banner-slide">
                    <Swiper
                        modules={[Keyboard, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        keyboard={{
                            enabled: true,
                        }}
                    >
                        {BannerData.map(banner =>
                            <SwiperSlide key={banner.id}>
                                <SingleBanner banner={banner} />
                            </SwiperSlide>
                        )}
                        <SwiperCustomNavigation />
                    </Swiper>
                </div>
            </section>
        </>
    );
};

export default Banner;