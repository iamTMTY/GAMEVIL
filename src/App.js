import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Components/Pages/Home/Home";
import Product from "./Components/Pages/Product/Product";
import Search from "./Components/Pages/Search/Search";
import Cart from "./Components/Pages/Cart/Cart";

export const setGlobalStateContext = React.createContext();
export const globalStateContext = React.createContext();

function App() {
	const initialState = {
		cart: [],
		modal: {
			text: "",
			top: "-100%",
			timeout: null
		}
	};
	const [globalState, setGlobalState] = useState(initialState);

	return (
		<BrowserRouter>
			<div className="App">
				<Route
					exact
					path="/"
					render={(props) => (
						<setGlobalStateContext.Provider value={setGlobalState}>
							<globalStateContext.Provider value={globalState}>
								<Home />
							</globalStateContext.Provider>
						</setGlobalStateContext.Provider>
					)}
				/>
				<Route
					path="/product"
					render={(props) => (
						<setGlobalStateContext.Provider value={setGlobalState}>
							<globalStateContext.Provider value={globalState}>
								<Product />
							</globalStateContext.Provider>
						</setGlobalStateContext.Provider>
					)}
				/>
				<Route
					path="/search"
					render={(props) => (
						<setGlobalStateContext.Provider value={setGlobalState}>
							<globalStateContext.Provider value={globalState}>
								<Search />
							</globalStateContext.Provider>
						</setGlobalStateContext.Provider>
					)}
				/>
				<Route
					path="/cart"
					render={(props) => (
						<setGlobalStateContext.Provider value={setGlobalState}>
							<globalStateContext.Provider value={globalState}>
								<Cart />
							</globalStateContext.Provider>
						</setGlobalStateContext.Provider>
					)}
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;
