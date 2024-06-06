import BannerBackground from "../assets/home-banner-background.png";
import BannerImage from "../assets/home-banner-image.png";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return (
		<div className="home-container">
			<Navbar />
			<div className="home-banner-container">
				<div className="home-bannerImage-container">
					<img src={BannerBackground} alt="" />
				</div>
				<div className="home-text-section">
					<h1 className="primary-heading">
					Sports tournaments
					</h1>
					<p className="primary-text">
					A sports tournament is an organized competition in which several participants or teams 
					s; compete in a structured setting to determine a champion or an eventual winner. 
					Tournaments can vary in size and format, 
					ranging from small local competitions to large-scale international events.
					</p>
					<Link to={user? "/home" : "/login"} className=" no-underline">
						<button className="secondary-button">
							Join Now {" "}
						</button>
					</Link>
				</div>
				<div className="home-image-section">
					<img src={BannerImage} alt="" />
				</div>
			</div>
		</div>
	);
};


export default Home;
