import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const WidgetTag = () => {
    return (
        <>
            <div className="widget-tag">
                <h1>Tag Cloud</h1>
                <ul>
                    <li><Link to="#">industrial</Link></li>
                    <li><Link to="#">oil</Link></li>
                    <li><Link to="#">Gass</Link></li>
                    <li><Link to="#">Energy Power</Link></li>
                    <li><Link to="#">Mechanical</Link></li>
                    <li><Link to="#">Repair </Link></li>
                    <li><Link to="#">Technical</Link></li>
                    <li><Link to="#">Petroleum </Link></li>
                    <li><Link to="#">Refinery  </Link></li>
                </ul>
            </div>
        </>
    );
};

export default WidgetTag;