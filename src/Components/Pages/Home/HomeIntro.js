import React from "react";
import { Link } from "react-router-dom";
import raiden from "../../../assets/imgs/raiden-small.jpg";

export default function Intro() {
	return (
		<div className="intro">
			<div
				className="intro-content"
				style={{
					backgroundImage: `url(${raiden})`
				}}
			>
				<div className="intro-text">
					<h1>
						<pre>The Only GameStore You Need</pre>
					</h1>
					<Link to={"/"} className="sign-in_btn">
						{" "}
						SIGN IN{" "}
					</Link>
				</div>
			</div>
		</div>
	);
}
