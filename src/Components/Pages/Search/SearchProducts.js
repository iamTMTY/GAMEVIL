import React from "react";
import Card from "../../Card";
import { useLocation } from "react-router-dom";

export default function SearchProducts({ result }) {
	const location = useLocation();

	let header;
	let products;
	if (result?.collectionByHandle) {
		header = `Browse ${result.collectionByHandle.handle?.split("-").join(" ")}`;
		products = result.collectionByHandle.products.edges;
	} else {
		const urlArr = location.search.split("?=");
		const searchHandle = decodeURIComponent(urlArr[urlArr.length - 1]);
		header = `Search results for "${searchHandle}"`;
		products = result.products.edges;
	}

	return (
		<section class="search-content">
			<header class="search-header">
				<h3> {header} </h3>
			</header>
			<div className="search-results">
				{products.map((product) => (
					<div className="search-card">
						<Card product={product} />
					</div>
				))}
			</div>
		</section>
	);
}
