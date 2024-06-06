import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="w-full text-center p-4">
			ISTA Tinghir©{new Date().getFullYear()} Created by{" "}
			<Link to="https://www.facebook.com/profile.php?id=100014903109909"> Medox </Link> and{" "}
			<Link to="https://www.facebook.com/profile.php?id=100014903109909"> djamal </Link>
		</div>
	);
};

export default Footer;
