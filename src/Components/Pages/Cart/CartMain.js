import React from "react";
import CartContent from "./CartContent";

export default function CartMain() {
	const cart = JSON.parse(localStorage.getItem("globalState")) || [];

	return (
		<main id="cart" className="main">
			<div className="cart">
				<header className="cart-header">
					<h1>Shopping Cart ({cart.length} items)</h1>
				</header>
				{cart.length < 1 && <p className="no-cart"> There are no items in your cart </p>}
				{cart.length > 0 && <CartContent />}
			</div>
		</main>
	);
}
