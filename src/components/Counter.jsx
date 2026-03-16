import React from 'react';
import CountUpData from '../jsonData/CountUpData.json'
import SingleCountUp from './SingleCountUp';

const Counter = () => {
    return (
        <>
            <div className="row">
                {CountUpData.map(counts =>
                    <div className="col-6" key={counts.id}>
                        <SingleCountUp counts={counts} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Counter;