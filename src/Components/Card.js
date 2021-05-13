import React from "react";
import { Link } from "react-router-dom";

export default function Card({ product }) {
	return (
		<div className="card">
			<div
				className="product-image"
				style={{
					backgroundImage: `url(${product.node.images.edges[0].node.originalSrc})`
				}}
			></div>
			<div className="product-type">{product.node.productType}</div>
			<Link
				to={`/product/${product.node.collections.edges[0].node.handle}/${product.node.handle}`}
				className="product-name"
			>
				{product.node.title}
			</Link>
			{/* <div className="product-name" id={id} onClick={getProductUrl}>{product.node.title}</div> */}
			<div className="product-price">
				<span>&#8358;</span>
				{`${product.node.variants.edges[0].node.price
					.split(".")[0]
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
			</div>
		</div>
	);
}
