import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import Slider from "../../Slider/Slider";
import CartMain from "./CartMain";
// import InfoModal from "../../InfoModal";

export default function Cart() {
	return (
		<>
			{/* <InfoModal /> */}
			<Header />
			<CartMain />
			{/* <Slider /> */}
			<Footer />
		</>
	);
}
