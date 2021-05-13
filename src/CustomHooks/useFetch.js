import { useEffect, useState } from "react";

export default function useFetch(query, dependency) {
	const fetchParams = {
		url: `https://gamevil-pro.myshopify.com/api/2021-01/graphql.json`,
		body: {
			query
		}
	};

	const [products, setProducts] = useState({ isFetching: true, data: {} });

	useEffect(() => {
		fetch(fetchParams.url, {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": "3ab541021a1b96b940f222d98ba23d2c"
			},
			body: JSON.stringify(fetchParams.body)
		})
			.then((res) => res.json())
			.then((data) => {
				setProducts({ isFetching: false, data });
			})
			.catch((err) => console.log("err", err));

		return () => {
			window.scrollTo(0, 0);
			setProducts({ isFetching: true, data: {} });
		};
	}, [dependency]);

	return products;
}
