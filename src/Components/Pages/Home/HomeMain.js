import React, { useRef, useContext } from "react";
import Categories from "../../Categories";
import HomeProducts from "./HomeProducts";
import { setGlobalStateContext } from "../../../App";

export default function HomeMain() {
	const mainRef = useRef(null);
	const setGlobalState = useContext(setGlobalStateContext);

	return (
		<main ref={mainRef} id="home" className="main">
			<Categories mainRef={mainRef} />
			<HomeProducts />
		</main>
	);
}
