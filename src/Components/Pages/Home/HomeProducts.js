import React from "react";
import useFetch from "../../../CustomHooks/useFetch.js";
import { homeQuery } from "../../queries.js";
import Slider from "../../Slider/Slider.js";
import Spinner from "../../Spinner.js";

export default function HomeProducts() {
	const query = homeQuery;

	const data = useFetch(query, query);

	if (data.isFetching) {
		return <Spinner text={"Loading Products"} />;
	} else {
		return (
			<div className="products">
				{data.data.data.collections.edges.map((slider) => (
					<Slider collection={slider.node} />
				))}
			</div>
		);
	}
}
