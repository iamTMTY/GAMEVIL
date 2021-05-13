import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { globalStateContext } from "../App";

export default function Header({ previousSearch = "" }) {
	const history = useHistory();
	const [CartItems, setCartItems] = useState(0);
	const [searchText, setSearchText] = useState(previousSearch);
	const globalState = useContext(globalStateContext);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("globalState")) || [];

		const totalItems = data.reduce((acc, curr) => {
			acc += curr.quantity;
			return acc;
		}, 0);

		setCartItems(totalItems);
	}, [globalState]);

	function changeText(e) {
		setSearchText(e.target.value);
	}

	const searchHandler = (e) => {
		e.preventDefault();
		const searchText = e.target[0].value;
		history.push(`/search?=${searchText}`);
	};

	return (
		// <ReactFragment>
		<header className="site-header">
			<section>
				<div className="ham-menu">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<Link to={"/"} className="logo">
					GAMEVIL
				</Link>
				<div className="sign-in">Sign In/Sign Up</div>
				<Link to={"/cart"} className="shopping-cart">
					<div className="cart-text">Cart</div>
					<i className="material-icons">shopping_cart</i>
					<div className="cart-count">{CartItems}</div>
				</Link>
			</section>
			<section>
				<form className="search-form" method="" action="" onSubmit={searchHandler}>
					<input
						type="text"
						placeholder="search all products and categories"
						value={searchText}
						onChange={changeText}
						name="search_input"
						className="search-input"
					/>
					<input type="submit" value="Search" className="search-btn" />
					{/* <Link to={`/search?=${searchText}`} className="search-btn">
						Search
					</Link> */}
				</form>
			</section>
		</header>
		// </ReactFragment>
	);
}
