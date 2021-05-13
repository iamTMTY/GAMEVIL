import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { globalStateContext } from "../../../App";
import { productQuery } from "../../queries";
import Spinner from "../../Spinner";
import CartItems from "./CartItems";

export default function CartContent() {
	const cart = JSON.parse(localStorage.getItem("globalState"));

	const globalState = useContext(globalStateContext);

	const price = {
		unitPrice: [],
		subTotalPrice: [],
		totalPrice: 0
	};

	const [products, setProducts] = useState({ isFetching: true, data: [] });

	const queries = cart.map((product) => {
		const query = productQuery(product.productHandle);
		return query;
	});

	function calculatePrice(arr) {
		arr.forEach((product, index) => {
			const unitPrice = parseFloat(product.variants.edges[0].node.price);
			const subTotalPrice = unitPrice * cart[index].quantity;

			price.unitPrice.push(unitPrice);
			price.subTotalPrice.push(subTotalPrice);
			price.totalPrice += subTotalPrice;
		});
	}

	function getProduct(idx, queries, arr = []) {
		const newArr = [...arr];

		if (idx === queries.length) {
			setProducts({ isFetching: false, data: newArr });
		} else {
			fetch(`https://gamevil-pro.myshopify.com/api/2021-01/graphql.json`, {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-Shopify-Storefront-Access-Token": "3ab541021a1b96b940f222d98ba23d2c"
				},
				body: JSON.stringify({ query: queries[idx] })
			})
				.then((res) => res.json())
				.then((data) => {
					newArr.push(data.data.productByHandle);
					getProduct(idx + 1, queries, newArr);
				});
		}
	}

	useEffect(() => {
		getProduct(0, queries);
	}, [globalState]);

	if (products.isFetching) {
		return <Spinner text="Preparing Cart" />;
	} else {
		calculatePrice(products.data);
		return (
			<>
				<section className="cart-content">
					<header className="cart-content-header">
						<h2 className="delete-header"></h2>
						<h2 className="quantity-header">qty</h2>
						<h2 className="item-header">item</h2>
						<h2 className="unit-price-header">unit price</h2>
						<h2 className="sub-total-header">sub total</h2>
					</header>
					<section className="items">
						<CartItems setProducts={setProducts} products={products.data} price={price} />
					</section>
					<div className="total-price-container">
						<h3>TOTAL</h3> <span>:</span>
						<div className="total-price">
							<span>&#8358;</span>
							{price.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						</div>
					</div>
				</section>
				<div className="checkout-or-continue">
					<Link to="/" className="continue-shopping custom-button">
						Continue Shopping
					</Link>
					<button className="checkout custom-button">Proceed to Checkout</button>
				</div>
			</>
		);
	}
}
