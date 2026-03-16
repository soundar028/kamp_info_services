import React from 'react';
import BlogData from '../jsonData/BlogData.json'
import SingleWidgetNews from './SingleWidgetNews';

const WidgetNews = () => {
    return (
        <>
            <div className="widget-two">
                <h1>recent News</h1>
                <div className="all_r_pst">
                    {BlogData.slice(0, 3).map(news =>
                        <SingleWidgetNews news={news} key={news.id} />
                    )}
                </div>
            </div>
        </>
    );
};

export default WidgetNews;