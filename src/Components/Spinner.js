import React from "react";
import spinner from "../assets/spinner/spinner.gif";

export default function Spinner({ text }) {
	return (
		<div className="spinner">
			<img src={spinner} alt="Loading..." />
			<p> {`${text}...`} </p>
		</div>
	);
}
