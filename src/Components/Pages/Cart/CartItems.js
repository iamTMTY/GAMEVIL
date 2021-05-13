import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { setGlobalStateContext, globalStateContext } from "../../../App";

export default function CartItems({ setProducts, products, price }) {
	const cart = JSON.parse(localStorage.getItem("globalState"));
	const setGlobalState = useContext(setGlobalStateContext);
	const globalState = useContext(globalStateContext);

	function parseCurrency(n) {
		return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function removeProduct(e) {
		const handle = e.target.id;
		const newCart = cart.filter((product) => product.productHandle !== handle);

		setProducts({ isFetching: true });
		localStorage.setItem("globalState", JSON.stringify(newCart));
		setGlobalState({ ...globalState, cart: newCart });
	}

	function updateQuantity(e) {
		const handle = e.target.id;
		const newCart = cart.map((product) => {
			const updated = {
				productHandle: product.productHandle,
				quantity: product.quantity,
				productImage: product.productImage
			};
			if (product.productHandle === handle) {
				updated.quantity = e.target.classList.contains("reduce-qty")
					? product.quantity > 1
						? product.quantity - 1
						: product.quantity
					: product.quantity + 1;
			}

			return updated;
		});

		localStorage.setItem("globalState", JSON.stringify(newCart));
		setGlobalState({ ...globalState, cart: newCart });
	}

	return price.unitPrice.map((p, index) => (
		<section className="item">
			<div className="delete-item">
				<i className="material-icons" id={cart[index].productHandle} onClick={removeProduct}>
					delete
				</i>
			</div>
			<div className="item-quantity">
				<div className="quantity">
					<div className="reduce-qty" id={cart[index].productHandle} onClick={updateQuantity}>
						{" "}
						-{" "}
					</div>
					<div className="qty">{cart[index].quantity}x</div>
					<div className="increase-qty" id={cart[index].productHandle} onClick={updateQuantity}>
						{" "}
						+{" "}
					</div>
					{/* <p> {cart[index].quantity}x </p>
					<i className="material-icons">expand_more</i> */}
				</div>
			</div>
			<div className="item-description-image">
				<div
					className="item-image"
					style={{ backgroundImage: `url(${cart[index].productImage})` }}
				></div>
				<div className="item-description">
					<Link
						className="item-name"
						to={`/product/${products[index].collections.edges[0].node.handle}/${cart[index].productHandle}`}
					>
						{products[index].title}
					</Link>
					<div className="item-category"> category </div>
					<div className="additional-info"></div>
					<div className="mobile-quantity-price">
						<div className="mobile-quantity">
							<div className="reduce-qty" id={cart[index].productHandle} onClick={updateQuantity}>
								{" "}
								-{" "}
							</div>
							<div className="qty">{cart[index].quantity}</div>
							<div className="increase-qty" id={cart[index].productHandle} onClick={updateQuantity}>
								{" "}
								+{" "}
							</div>
						</div>
					</div>
					<div className="mobile-delete-save">
						<div className="mobile-price">
							<span>&#8358;</span>
							{parseCurrency(price.subTotalPrice[index])}
						</div>
						{/* <i className="material-icons"></i> */}
						{/* <i className="material-icons delete">delete</i> */}
					</div>
				</div>
			</div>
			<div className="item-unit-price">
				<span>&#8358;</span>
				{parseCurrency(price.unitPrice[index])}
			</div>
			<div className="item-sub-total">
				<span>&#8358;</span>
				{parseCurrency(price.subTotalPrice[index])}
			</div>
		</section>
	));
}
