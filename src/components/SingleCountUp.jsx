import React from 'react';
import CountUp from 'react-countup';

const SingleCountUp = ({ counts }) => {
    const { start, end, text, delay } = counts;

    return (
        <>
            <div className="count-up-inner">
                <div className="countup-text">
                    <h2 className="counter">
                        <CountUp start={start} end={end} delay={delay} />
                    </h2>
                    <h4>{text}</h4>
                </div>
            </div>
        </>
    );
};

export default SingleCountUp;