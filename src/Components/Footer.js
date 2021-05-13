import React from "react";
import facebook from "../assets/imgs/facebook-f-brands.svg";
import twitter from "../assets/imgs/twitter-brands.svg";
import google from "../assets/imgs/google-plus-g-brands.svg";
import insta from "../assets/imgs/instagram-brands.svg";

const footers = [
	{
		header: "GAMEVIL",
		links: [
			"About Us",
			"Support Hub",
			"Contact",
			"FAQ",
		],
	},
	{
		header: "Our Products",
		links: [
			"Games",
			"Cards and Points",
			"Subscriptions",
			"DLC",
			"Software",
		],
	},
];

export default function Footer() {
	return (
		<footer>
			<div className="footer-logo">GAMEVIL</div>
			<div className="footer-content">
				{footers.map((footer, idx) => {
					return (
						<div key={idx} className="gamevil">
							<div className="footer-header">
								{footer.header}
							</div>
							{footer.links.map((link, idx) => {
								return (
									<div
										key={idx}
										className="footer-link"
									>
										<a href="https://google.com">
											{link}
										</a>
									</div>
								);
							})}
						</div>
					);
				})}
				<div className="follow-us">
					<div className="footer-header">
						Follow Us
					</div>
					<div className="footer-social-icons">
						<img src={facebook} alt="" />
						<img src={twitter} alt="" />
						<img src={google} alt="" />
						<img src={insta} alt="" />
					</div>
				</div>
			</div>
		</footer>
	);
}
