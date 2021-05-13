import React from "react";
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
				</div>
			</div>
		</div>
	);
}
