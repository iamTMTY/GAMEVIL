import React, { useState, useEffect, useRef, useContext } from "react";
import basketball from "../assets/imgs/basketball-ball-solid.svg";
import game from "../assets/imgs/video-games.svg";
import gamepad from "../assets/imgs/gamepad-console.svg";
import { Link } from "react-router-dom";
import { setGlobalStateContext } from "../App";

export default function Categories({ mainRef }) {
	const setGlobalState = useContext(setGlobalStateContext);
	const categories = [
		{
			name: "Games",
			iconSrc: basketball,
			subCategories: [
				{ name: "Adventure Games", shopifyHandle: "adventure" },
				{ name: "Action Games", shopifyHandle: "action-games" },
				{ name: "RPG'S", shopifyHandle: "role-playing-games" },
				{ name: "Simulation Games", shopifyHandle: "simulation-games" },
				{ name: "Battle Royale Games", shopifyHandle: "simulation-games" },
				{ name: "MMORPG'S", shopifyHandle: "simulation-games" },
				{ name: "Sport Games", shopifyHandle: "simulation-games" }
			]
		},
		{
			name: "Gaming Console",
			iconSrc: game,
			subCategories: ["Playstation", "Xbox", "Nintendo", "Retro"]
		},
		{
			name: "Gaming Accessories",
			iconSrc: gamepad,
			subCategories: ["Controllers", "Headsets", "Gaming seats", "VR Headesets", "Connectors"]
		}
	];

	const initialState = categories.map((category, id) => {
		return {
			id,
			height: "0"
		};
	});

	const [categoryHeight, setcategoryHeight] = useState(initialState);
	const [categoryPosition, setCategoryPosition] = useState("position-relative");

	const categoriesRef = useRef(null);

	function expandCategory(e) {
		const subCategory = e.target.parentElement.nextElementSibling;
		const currentHeight = window
			.getComputedStyle(subCategory)
			.getPropertyValue("height")
			.split("px")[0];
		if (currentHeight === "0") {
			const newHeight = subCategory.scrollHeight;
			const newState = categoryHeight.map((category) => {
				if (category.id.toString() === e.target.id) {
					return { id: category.id, height: newHeight };
				} else {
					return { id: category.id, height: "0" };
				}
			});
			setcategoryHeight(newState);
		} else {
			const newState = categoryHeight.map((category) => {
				return {
					id: category.id,
					height: "0"
				};
			});

			setcategoryHeight(newState);
		}
	}

	function checkScrollPosition() {
		if (window.innerWidth >= 800) {
			if (mainRef.current.getBoundingClientRect().bottom - window.innerHeight <= 0) {
				setCategoryPosition("position-absolute");
			} else if (mainRef.current.getBoundingClientRect().top <= 0) {
				setCategoryPosition("position-fixed");
			} else {
				setCategoryPosition("position-relative");
			}
		}
	}

	useEffect(() => {
		try {
			checkScrollPosition();
			window.addEventListener("scroll", checkScrollPosition);
		} catch (err) {
			console.log(err);
		}

		return () => {
			window.removeEventListener("scroll", checkScrollPosition);
		};
	}, []);

	return (
		<div ref={categoriesRef} id="categories" className={categoryPosition}>
			<h3 className="browse-all-categories">Browse all categories</h3>
			<nav className="browse-main-categories">
				{categories.map((category, id) => {
					return (
						<div className="category" key={id}>
							<div className="category-title-wrapper">
								<div className="category-img_title">
									<img src={category.iconSrc} alt="" />
									<h3>{category.name}</h3>
								</div>
								<div className="expand">
									<div className="horizontal"></div>
									<div className="vertical"></div>
								</div>
								<div className="category-click" id={id} onClick={expandCategory}></div>
							</div>
							<div
								className={"category-options"}
								style={{
									height: `${categoryHeight[id].height}px`
								}}
							>
								{category.subCategories.map((subCategory, id) => {
									return (
										<Link
											to={`/search/collections/${subCategory?.shopifyHandle || subCategory}`}
											className="option"
											onClick={() => {
												// setGlobalState({
												// 	searchHandle: subCategory?.shopifyHandle || "action-games"
												// });
											}}
										>
											{subCategory?.name || subCategory}
										</Link>
										// <div className="option" key={id}>
										// 	{subCategory}
										// </div>
									);
								})}
							</div>
						</div>
					);
				})}
			</nav>
		</div>
	);
}
