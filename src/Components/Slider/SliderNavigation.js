import React from "react";

export default function SliderNavigation({ scrollBarRef }) {
	function navigateSlider(e) {
		const position = scrollBarRef.current.getScrollLeft();
		const width = scrollBarRef.current.getScrollWidth();
		const clientWidth = scrollBarRef.current.getClientWidth();
		const ALLOWANCE = (10 / 100) * clientWidth;
		const movement = clientWidth - ALLOWANCE;

		let navButton = e.target;
		if (e.target.tagName === "path") {
			navButton = e.target.parentElement;
		}

		if (navButton.classList.contains("next") || navButton.classList.contains("next-icon")) {
			const newPosition = position + movement > width ? width : position + movement;
			scrollBarRef.current.scrollLeft(newPosition);
		} else {
			const newPosition = position - movement < 0 ? 0 : position - movement;
			scrollBarRef.current.scrollLeft(newPosition);
		}
	}

	return (
		<>
			<svg
				width="40"
				height="150"
				className="previous"
				viewBox="0 0 40 231"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onClick={navigateSlider}
			>
				<path
					opacity="0.4"
					d="M23.6866 60.767C9.27395 32.7384 2.55693 9.24373 1 1V231C1 218.909 5.53733 185.824 23.6866 150.211C46.3733 105.695 41.7025 95.8029 23.6866 60.767Z"
					fill="black"
					stroke="black"
				/>
			</svg>
			<i className="material-icons previous-icon" onClick={navigateSlider}>
				navigate_before
			</i>
			<svg
				width="40"
				height="150"
				className="next"
				viewBox="0 0 40 231"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onClick={navigateSlider}
			>
				<path
					opacity="0.4"
					d="M23.6866 60.767C9.27395 32.7384 2.55693 9.24373 1 1V231C1 218.909 5.53733 185.824 23.6866 150.211C46.3733 105.695 41.7025 95.8029 23.6866 60.767Z"
					fill="black"
					stroke="black"
				/>
			</svg>
			<i className="material-icons next-icon" onClick={navigateSlider}>
				navigate_next
			</i>
		</>
	);
}
