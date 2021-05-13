import React, { useRef } from "react";
import Categories from "../../Categories";
import SearchContent from "./SearchContent";

export default function SearchMain() {
	const mainRef = useRef(null);

	return (
		<main id="search" ref={mainRef} class="main">
			<Categories mainRef={mainRef} />
			<SearchContent />
		</main>
	);
}
