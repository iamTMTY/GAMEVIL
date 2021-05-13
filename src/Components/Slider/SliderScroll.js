import React, { useState, useRef, useEffect } from "react";

export default function SliderScroll({
	scrollBarPosition,
	setScrollBarPosition,
	cardsRef,
	setCardPosition
}) {
	const [scrollBarWidth, setScrollbarWidth] = useState(0);
	const scrollTrackRef = useRef(null);
	const scrollBarRef = useRef(null);

	useEffect(() => {
		setScrollbarWidth(getScrollbarWidth);
		window.addEventListener("resize", () => {
			setScrollbarWidth(getScrollbarWidth);
		});
	}, []);

	function startScrollBarDrag(clickEvent) {
		const helperFunction = (moveEvent) => {
			moveScrollBar(moveEvent, clickEvent);
		};
		console.log(clickEvent.clientX);
		document.addEventListener("mousemove", helperFunction);

		window.addEventListener(
			"mouseup",
			() => {
				console.log("i entered");
				document.removeEventListener("mousemove", helperFunction);
			},
			{ once: true }
		);
	}

	function moveScrollBar(moveEvent, clickEvent) {
		const scrollTrackWidth = parseInt(
			window.getComputedStyle(scrollTrackRef.current).getPropertyValue("width")
		);
		const scrollBarStart = scrollBarRef.current.getBoundingClientRect().left;
		const shift = clickEvent.clientX - scrollBarStart;
		console.log(clickEvent.clientX);

		let movement = moveEvent.clientX - shift - scrollTrackRef.current.getBoundingClientRect().left;

		if (movement < 0) {
			movement = 0;
		} else if (movement > scrollTrackWidth - scrollBarWidth) {
			movement = scrollTrackWidth - scrollBarWidth;
		}
		console.log(movement);
		setScrollBarPosition(movement);

		// const cardPosition = (movement / scrollTrackWidth) * cardsRef.scrollWidth;
		// setCardPosition(cardPosition);
	}

	function getScrollbarWidth() {
		const cardsTotalWidth = cardsRef.current.scrollWidth;
		const cardsVisibleWidth = parseInt(
			window.getComputedStyle(cardsRef.current.parentElement).getPropertyValue("width")
		);
		// console.log(cardsTotalWidth, cardsVisibleWidth);

		return cardsVisibleWidth / (cardsTotalWidth / cardsVisibleWidth);
	}

	return (
		<>
			<div ref={scrollTrackRef} className="card-scroll-container">
				<div
					ref={scrollBarRef}
					className="card-scroll-bar"
					onMouseDown={startScrollBarDrag}
					style={{
						left: `${scrollBarPosition}px`,
						width: `${scrollBarWidth}px`
					}}
				></div>
			</div>
		</>
	);
}
