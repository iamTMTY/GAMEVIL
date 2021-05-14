import React, { useRef } from "react";
import Categories from "../../Categories";
import HomeProducts from "./HomeProducts";

export default function HomeMain() {
	const mainRef = useRef(null);

	return (
		<main ref={mainRef} id="home" className="main">
			<Categories mainRef={mainRef} />
			<HomeProducts />
		</main>
	);
}
