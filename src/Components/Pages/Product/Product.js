import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import ProductContent from "./ProductContent";
import InfoModal from "../../InfoModal";

export default function Product() {
	return (
		<>
			<InfoModal />
			<Header />
			<ProductContent />
			<Footer />
		</>
	);
}
