import React, { useState, useEffect, useContext, useRef } from "react";
import { globalStateContext, setGlobalStateContext } from "../../../App";
import ProductImages from "./ProductImages";
import Ratings from "../../Ratings";

export default function ProductMain({ product }) {
	const urlArr = document.location.hash.split("/");
	const productHandle = urlArr[urlArr.length - 1];

	const globalState = useContext(globalStateContext);
	const setGlobalState = useContext(setGlobalStateContext);

	const [details, setDetails] = useState({
		overview: {
			id: "current-detail",
			headerId: "current-detail-header"
		},
		reviews: {
			id: "",
			headerId: ""
		},
		specifications: {
			id: "",
			headerId: ""
		}
	});

	const [quantity, setQuantity] = useState(1);

	function showDetail(e) {
		if (e.target.id === "current-detail-header") {
			return false;
		}

		const targetClass = e.target.className.split("-header")[0];
		let newState = {
			overview: {
				id: "",
				headerId: ""
			},
			reviews: {
				id: "",
				headerId: ""
			},
			specifications: {
				id: "",
				headerId: ""
			}
		};

		newState[targetClass] = {
			id: "current-detail",
			headerId: "current-detail-header"
		};

		setDetails(newState);
	}

	function addToCart() {
		clearTimeout(globalState.modal.timeout);
		const productImage = product.images.edges[0].node.originalSrc;
		const oldState = JSON.parse(localStorage.getItem("globalState")) || [];
		let newState;
		const itemExists = oldState.some((item) => item.productHandle === productHandle);

		if (itemExists) {
			newState = oldState.map((item) => {
				if (item.productHandle === productHandle) {
					return { productHandle, quantity: item.quantity + quantity, productImage };
				} else {
					return {
						productHandle: item.productHandle,
						quantity: item.quantity,
						productImage: item.productImage
					};
				}
			});
		} else {
			newState = [...oldState, { productHandle, quantity, productImage }];
		}
		let clearModal = setTimeout(() => {
			setGlobalState({ modal: { top: "-100%" } });
		}, 3000);
		const modalMessage = `Added "${productHandle.split("-").join(" ")}" to cart`;
		setGlobalState({
			cart: newState,
			modal: { text: modalMessage, top: "0", timeout: clearModal }
		});

		localStorage.setItem("globalState", JSON.stringify(newState));
	}

	return (
		// <h1> Yaaayy!!! It Worked </h1>
		<main id="product" className="main">
			<div className="main-product">
				<div className="product-images-and-description">
					<ProductImages imageSrc={product.images.edges[0].node.originalSrc} />
					<div className="main-product-description">
						<div className="main-product-name">{product.title}</div>
						<Ratings />
						<div className="main-product-price">
							<div className="discounted-price"> discountPrice </div>
							<div className="normal-price">
								<p> {product.variants.edges[0].node.price} </p>
								<p> percentOff </p>
							</div>
						</div>
						<div className="main-product-variations">
							{product.options.map((option) => {
								return (
									<div className="variation">
										<header> {option.name} : </header>
										<div className="variation-content">
											{option.values.map((value) => {
												return <div>{value}</div>;
											})}
										</div>
									</div>
								);
							})}
							<div className="main-product-quantity">
								<header>Quantity : </header>
								<div className="main-product-quantity-content">
									<div
										className="reduce-quantity"
										onClick={() => {
											quantity > 1 && setQuantity(quantity - 1);
										}}
									>
										{" "}
										-{" "}
									</div>
									<div className="main-quantity"> {quantity} </div>
									<div
										className="increase-quantity"
										onClick={() => {
											setQuantity(quantity + 1);
										}}
									>
										{" "}
										+{" "}
									</div>
								</div>
							</div>
						</div>
						<div className="action-buttons">
							<button>BUY NOW</button>
							<button onClick={addToCart}>ADD TO CART</button>
						</div>
					</div>
				</div>
			</div>
			<div className="product-additional-details">
				<header>
					<h3 className="overview-header" id={details.overview.headerId} onClick={showDetail}>
						OVERVIEW <hr />
					</h3>
					<h3
						className="specifications-header"
						id={details.specifications.headerId}
						onClick={showDetail}
					>
						SPECIFICATIONS <hr />
					</h3>
					<h3 className="reviews-header" id={details.reviews.headerId} onClick={showDetail}>
						REVIEWS <hr />
					</h3>
				</header>
				<div className="additional-details-content">
					<div className="overview" id={details.overview.id}>
						{product.description}
					</div>
					<div className="specifications">
						<div className="spec">
							<div className="spec-title">
								SKU
								<span>:</span>{" "}
							</div>
							<div className="spec-name">{product.variants.edges[0].node.sku}</div>
						</div>
					</div>
					<div className="specifications" id={details.specifications.id}>
						<div className="spec">
							<div className="spec-title">
								Weight
								<span>:</span>{" "}
							</div>
							<div className="spec-name">{product.variants.edges[0].node.weight}kg</div>
						</div>
					</div>
					<div className="reviews" id={details.reviews.id}>
						<div className="review">
							<div className="reviewer-name_title">
								<p> John Doe </p> <span>|</span> <p> Good Product </p>
							</div>
							<Ratings />
							<div className="reviewer-comment">
								<p> This is a very nice product </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
