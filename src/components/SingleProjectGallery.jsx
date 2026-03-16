import React from 'react';

const SingleProjectGallery = ({ gallery }) => {
    const { image } = gallery;

    return (
        <>
            <div className="gallery-item">
                <img src={`img/gallery/${image}`} alt="galleryImage" />
                <div className="gallery-overlay">
                </div>
            </div>
        </>
    );
};

export default SingleProjectGallery;