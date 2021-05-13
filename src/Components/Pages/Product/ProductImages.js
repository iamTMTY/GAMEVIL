import React from "react";

export default function ProductImages({ imageSrc }) {
	return (
		<>
			<div className="main-product-image_video">
				<div className="main-image" style={{ backgroundImage: `url(${imageSrc})` }}></div>
				<div className="other-images">
					<div style={{ backgroundImage: `url(${imageSrc})` }}></div>
					<div style={{ backgroundImage: `url(${imageSrc})` }}></div>
				</div>
			</div>
			<div className="mobile-image-slide">
				<img src={imageSrc} alt="" />
			</div>
		</>
	);
}
