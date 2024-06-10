import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function BikeCard({ tournament }) {
	return (
		<div className="card bike-card px-2 py-1">
			<div className="container">
				<p className="text-2xl p-0 m-0 text-bold"> {tournament.title}</p>
				<p className="text-2xl">Max of Teams : {tournament.teams}</p>
			</div>
			<div className="overflow-hidden h-48 flex justify-center">
				<img
					src={`${tournament.photo}`}
					alt=""
					className="h-full hover:scale-110 duration-300 ease-in-out"
				/>
			</div>
			<div className="card-info px-4 ">
				<p className="text-2xl p-0 m-0">Sport type : {tournament.type}</p>
				<p className="text-xl p-0 m-0">PLayers per team : {tournament.players}</p>
				<p className="text-sm min-h-32 overflow-hidden text-justify">
					{tournament.description}
				</p>
				<div className="flex justify-between">
					<p className="text-1xl">
						Inscription Fee : {tournament.fees}{" "}
						<span className="text-sm"> $</span>
					</p>
					<Link to={`/reserve/${tournament.id}`} className="no-underline">
						<button className="flex items-center gap-2 overflow-hidden">
							<span>Join</span>
							<FaArrowRight className="arrow" />
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
