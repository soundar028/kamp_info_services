import React from 'react';
import GalleryContent from './GalleryContent';
import LoadMoreProduct from './LoadMoreProduct';

const ProjectGallery = () => {
	return (
		<>
			<section className="gallery-sec pt-100 pb-70">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="sec-title">
								<span>Company Project</span>
								<h1>Company Project Gallery</h1>
								<div className="border-shape"></div>
								<p>Lorem ipsum dolor sit amet, lorem nibh lectus urna arcu, lorem erat semper, auctor suspendisse quisque molestie ut. Elit massa dui, leo enim magna. Cursus maecenas cubilia, ac nonummy, egestas mauris .</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="gallery-area">
							<GalleryContent />
							<LoadMoreProduct />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProjectGallery;