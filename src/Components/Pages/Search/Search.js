import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
import SearchMain from "./SearchMain";

export default function Search() {
	const location = useLocation();

	const urlArr = location.search.split("?=");
	const searchHandle = decodeURIComponent(urlArr[urlArr.length - 1]);

	return (
		<>
			<Header previousSearch={searchHandle} />
			<SearchMain />
			<Footer />
		</>
	);
}
