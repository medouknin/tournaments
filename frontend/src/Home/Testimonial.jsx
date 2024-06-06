import React from "react";
// import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
	return (
		<div className="work-section-wrapper">
			<div className="work-section-top">
				<p className="primary-subheading">Fan Reviews</p>
				<h1 className="primary-heading">What Our Fans Say</h1>
				<p className="primary-text">
					See what our customers have to say about their tournament experiences.
				</p>
			</div>
			<div className="testimonial-section-bottom">
				{/* <img src={ProfilePic} alt="" /> */}
				<p>
					"I had an amazing experience in tournament. The
					tournament was in great condition, and the share process was smooth and
					easy."
				</p>
				<div className="flex gap-2 text-yellow-600">
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
				</div>
				<h2>Faouzi LAQJAA</h2>
			</div>
		</div>
	);
};

export default Testimonial;
