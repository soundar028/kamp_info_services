import React, { useState } from 'react';
import GalleryData from '../jsonData/GalleryData'
import SingleProjectGallery from './SingleProjectGallery';

const GalleryContent = () => {

    const [items, setItems] = useState(GalleryData)
    return (
        <>
            <div className="gallery-container">
                <div className="row">
                    {items.map(gallery =>
                        <div className="col-md-6 col-lg-3" key={gallery.id}>
                            <SingleProjectGallery gallery={gallery} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GalleryContent;