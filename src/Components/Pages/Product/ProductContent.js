import React from "react";
import ProductMain from "./ProductMain";
import { collectionQuery } from "../../queries";
import { productQuery } from "../../queries";
import useFetch from "../../../CustomHooks/useFetch";
import Slider from "../../Slider/Slider";
import Spinner from "../../Spinner";

export default function ProductContent() {
	const urlArr = document.location.hash.split("/");
	const collectionHandle = urlArr[urlArr.length - 2];
	const productHandle = urlArr[urlArr.length - 1];

	const queryOne = productQuery(productHandle);
	const product = useFetch(queryOne, productHandle);

	const queryTwo = collectionQuery(collectionHandle);
	const collection = useFetch(queryTwo);

	if (product.isFetching || collection.isFetching) {
		return <Spinner text="Loading Product" />;
	} else {
		if (!product.data.data.productByHandle || !collection.data.data.collectionByHandle) {
			return <h1> Page Not Found</h1>;
		} else {
			return (
				<>
					<ProductMain product={product.data.data.productByHandle} />
					<Slider collection={collection.data.data.collectionByHandle} />
				</>
			);
		}
	}
}
