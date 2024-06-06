import React from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { GiPodiumWinner } from "react-icons/gi";

const Work = () => {
	const workInfoData = [
		{
			icon: <FcApproval className="text-5xl" />,
			title: "Explore Our Teams",
			text: "Discover our diverse collection of football teams suitable for all types of fans. From sleek city teams to rugged underdog squads, we have something for everyone.",
		},
		{
			icon: <BsCalendar2Date className="text-5xl" />,
			title: "Select Your Teams Period",
			text: "Choose how long you want to engage in our tournament, whether it's for a few hours, a day, or even a week. We offer flexible options to suit your needs.",
		},
		{
			icon: <GiPodiumWinner className="text-5xl" />,
			title: "Hassle-Free Tournament",
			text: "With our convenient stadium locations, enjoy easy access and seamless entry. Our team ensures quick and efficient service so you can focus on the game without delay.",
		},
	];
	return (
		<div className="work-section-wrapper">
			<div className="work-section-top">
				<p className="primary-subheading">How It Works</p>
				<h1 className="primary-heading">choose an activity Made Easy</h1>
				<p className="primary-text">
					Discover how simple it is to choose an activity and embark on your adventure.
				</p>
			</div>
			<div className="work-section-bottom">
				{workInfoData.map((data) => (
					<div className="work-section-info" key={data.title}>
						<div className="info-boxes-img-container">
							{data.icon}
						</div>
						<h2>{data.title}</h2>
						<p>{data.text}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Work;
