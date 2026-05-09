import React from 'react';
import GalleryContent from './GalleryContent';
import LoadMoreProduct from './LoadMoreProduct';

const ProjectContent = () => {
    return (
        <>
            <section className="gallery-sec pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="gallery-area">
                            <GalleryContent />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectContent;