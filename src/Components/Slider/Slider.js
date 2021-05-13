import React, { useState, useRef, useEffect } from "react";
import Card from "../Card";
import SliderNavigation from "./SliderNavigation";
import { Scrollbars } from "react-custom-scrollbars";

export default function Slider({ collection }) {
	const cardsRef = useRef(null);

	const scrollBarRef = useRef(null);

	const [height, setheight] = useState(200);

	useEffect(() => {
		if (cardsRef.current) {
			setheight(cardsRef.current.scrollHeight);
		}
	}, [cardsRef]);

	return (
		<section className="cards-slider">
			<SliderNavigation scrollBarRef={scrollBarRef} />
			<header className="cards-header">{collection.handle?.split("-").join(" ")}</header>
			<Scrollbars
				ref={scrollBarRef}
				style={{ height: `${height}px` }}
				renderThumbHorizontal={(props) => <div {...props} className="thumb-horizontal" />}
			>
				<div className="cards-container" ref={cardsRef}>
					{collection.products.edges.map((product, id) => (
						<Card product={product} collectionHandle={collection.handle} key={id} />
					))}
				</div>
			</Scrollbars>
			{/* <div ref={cardsRef} className="cards">
					
				</div> */}
			{/* <SliderScroll
					cardsRef={cardsRef}
					scrollBarPosition={scrollBarPosition}
					setScrollBarPosition={setScrollBarPosition}
					setCardPosition={setCardPosition}
				/> */}
			{/* </div> */}
		</section>
	);
}
