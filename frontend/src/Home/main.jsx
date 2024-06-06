import Home from "./Home";
import About from "./About";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import "../styles/landing.css"
function Landing() {
	return (
		<div className="App">
			<Home />
			<About />
			<Work />
			<Testimonial />
			<Contact />
		</div>
	);
}

export default Landing;
