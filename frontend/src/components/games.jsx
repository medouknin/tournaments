import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
	getGamesByTournament,
	getTournaments,
} from "../storage/tournamentSlice";
import { Avatar } from "antd";

export default function Games() {
	const dispatch = useDispatch();
	const [selectedTournament, setSelectedTournament] = useState(null);
	const { tournaments, games, gamesIsLoading, gamesError } = useSelector(
		(state) => state.tournaments
	);

	useEffect(() => {
		dispatch(getTournaments());
		if (selectedTournament) {
			dispatch(getGamesByTournament(selectedTournament.id));
		}
	}, [dispatch, selectedTournament]);

	const handleTournamentClick = (tournament) => {
		setSelectedTournament(tournament);
	};

	return (
		<main
			className="bg-white p-3"
			style={{ display: "flex", justifyContent: "space-between" }}>
			{/* Left side for tournaments */}
			<div style={{ flex: "0 0 30%" }}>
				<h2>Tournaments</h2>
				<ul>
					{tournaments.map((tournament) => (
						<li
							className="flex gap-2 items-center p-2 cursor-pointer"
							key={tournament.id}
							onClick={() => handleTournamentClick(tournament)}>
							<Avatar src={tournament.TourPhoto} size={50} />
							<p className="flex items-center text-2xl">{tournament.name}</p>
						</li>
					))}
				</ul>
			</div>
			{/* Right side for games */}
			<div style={{ flex: "0 0 65%" }}>
				<h2 className="text-center">Games</h2>
				{gamesIsLoading ? (
					<p>Loading games...</p>
				) : gamesError ? (
					<p>Error: {gamesError}</p>
				) : games.length === 0 ? (
					<p>No games available for the selected tournament.</p>
				) : (
					<ul>
						{games.map((game) => (
							<li key={game.id}>
								<Link to={`/game/${game.id}`} className=" no-underline" >
									<div className=" grid grid-cols-3 text-black rounded-xl p-2 my-2 bg-gray-200 text-center items-center ">
										<p >{game.home_team.name}</p>
                                        <div className=" block">
                                            <p>Vs</p>
                                            <p>{game.date }</p>
                                        </div>
										<p>{game.away_team.name}</p>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</main>
	);
}
