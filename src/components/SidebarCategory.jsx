import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const SidebarCategory = () => {
    return (
        <>
            <ul>
                <li><Link to="#">Factory Energy Power</Link></li>
                <li><Link to="#">Chemical Research</Link></li>
                <li><Link to="#">Expert Mechanical</Link></li>
                <li><Link to="#">civil engineering</Link></li>
                <li><Link to="#">oil & gas services</Link></li>
                <li><Link to="#">Repair Technology</Link></li>
                <li><Link to="#">Refinery Petroleum</Link></li>
            </ul>
        </>
    );
};

export default SidebarCategory;