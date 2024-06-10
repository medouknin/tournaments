import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserIcon from "../assets/user-icon.svg";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { TbUserEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getCaptainTeam } from "../storage/teamsSlice"; // Make sure this path is correct
import { Avatar } from "antd";

export default function UserProfile() {
	const dispatch = useDispatch();
	let { id } = useParams();
	id = JSON.parse(atob(id));

	const user = JSON.parse(localStorage.getItem("user"));

	const { captainTeam, teamsIsLoading, teamsError } = useSelector(
		(state) => state.teams
	);

	useEffect(() => {
		dispatch(getCaptainTeam(user.id));
	}, [dispatch]);

	return (
		<main className="flex flex-col items-center">
			<div className="w-full py-4 px-20 bg-main h-48 flex gap-5">
				<div>
					<img src={UserIcon} alt="icon" className="h-full" />
				</div>
				<div className="w-full">
					<p className="text-4xl text-white"> {user.name}</p>
					<div className="flex justify-between text-white">
						<div className="flex gap-2 items-center text-2xl">
							<HiOutlineMail />
							{user.email}
						</div>
						<div className="flex gap-2 items-center text-2xl">
							<HiOutlinePhone />
							{user.phone}
						</div>
						<div>
							<Link
								to={`/profile/${btoa(JSON.stringify(id))}/edit`}
								className="flex gap-2 items-center text-2xl text-white">
								<TbUserEdit />
								Edit info
							</Link>
						</div>
					</div>
				</div>
			</div>
			<span className="mt-4 bg-gray-200 px-2 z-10">Team</span>
			<div className="line border-solid border-black border-1 w-full"></div>
			<div className="px-10 w-full bg-white mt-4 py-4 rounded-lg">
				{teamsIsLoading ? (
					<p>Loading team...</p>
				) : teamsError ? (
					<p>Error: {teamsError}</p>
				) : captainTeam.team ? (
					<div className=" flex justify-between mx-6">
						<div>
							<h2 className="text-2xl mb-4">{captainTeam.team.name}</h2>
							<h3 className="text-xl">Players</h3>
							<ul>
								{captainTeam.players.map((player) => (
									<li key={player.id} className="text-lg">
										{player.name}
									</li>
								))}
							</ul>
							<h3 className="text-xl mt-4">Tournament</h3>
							<div className=" flex items-center gap-3 ">
								<Avatar src={captainTeam.tournament.photo} size={50} />
								<p className="pt-2 text-xl">{captainTeam.tournament.title}</p>
							</div>
						</div>
						<div>
							<h3 className="text-xl">Games</h3>
							{captainTeam?.games.map((game) => (
								<li key={game.id}>
									<Link to={`/game/${game.id}`} className=" no-underline">
										<div className="grid grid-cols-3 text-black rounded-xl p-2 my-2 bg-gray-200 text-center items-center">
											<p>{game.home_team.name}</p>
											{today >= formatDate(game.date) ? (
												<p className="text-2xl mt-2">
													{game.home_goals + "-" + game.away_goals}
												</p>
											) : (
												<div className="block">
													<p>VS</p>
													<p>{formatDate(game.date)}</p>
												</div>
											)}
											<p>{game.away_team.name}</p>
										</div>
									</Link>
								</li>
							))}
						</div>
					</div>
				) : (
					<p>No team found for this captain.</p>
				)}
			</div>
		</main>
	);
}
