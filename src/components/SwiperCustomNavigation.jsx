import React from 'react';
import { useSwiper } from 'swiper/react';

const SwiperCustomNavigation = () => {
    const swiper = useSwiper();

    return (
        <>
            <div className="swiper-nav-buttons">
                <button className='previous' onClick={() => swiper.slidePrev()}>Previous</button>
                <button className='next' onClick={() => swiper.slideNext()}>Next</button>
            </div>
        </>
    );
};

export default SwiperCustomNavigation;