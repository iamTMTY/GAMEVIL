import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import Intro from "./HomeIntro";
import HomeMain from "./HomeMain";

export default function Home() {
	return (
		<>
			<Header />
			<Intro />
			<HomeMain />
			<Footer />
		</>
	);
}
