import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../storage/teamsSlice";
import axios from "axios";

const Reservation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const user = JSON.parse(localStorage.getItem("user"));
	const [teams, setTeams] = useState([]);
	const { tournaments, tournamentsIsLoading } = useSelector(
		(state) => state.tournaments
	);
	const tournament = tournaments.find((tour) => tour.id == id);

	const numberOfJoined = teams.filter(
		(item) => item.tournament_id == id
	).length;

	useEffect(() => {
		const getTeams = async () => {
			try {
				const response = await axios.get("http://127.0.0.1:8000/api/teams");
				setTeams(response.data);
			} catch (error) {
				console.log("error: ", error);
				throw error;
			}
		};
		getTeams();
	}, []);

	const onFinish = (values) => {
		values.captainId = user.id;
		values.tournamentId = parseInt(id);
		dispatch(createTeam(values));
		navigate("/home");
	};
	const alreadyJoined = 
	    teams.filter(
            (item) => item.tournament_id == id && item.captain_id == user.id
		).length > 0;
	

	const remainingSpots = tournament?.teams - numberOfJoined;

	return (
		<div className="container p-5">
			<div className="reserve-bike grid grid-cols-3 gap-4">
				<div className="reser-img-form col-span-2 w-full bg-white rounded-lg">
					<div className=" flex justify-center h-80 overflow-hidden p-2">
						<img src={tournament?.photo} alt="" className="h-full" />
					</div>
					<hr />
					<div className="container col-span-2">
						<h1>Insert your info</h1>
						<Form name="playerForm" onFinish={onFinish}>
							<Form.Item
								name="teamName"
								rules={[{ required: true, message: "Please enter team name" }]}>
								<Input placeholder="Team name" />
							</Form.Item>
							<hr />
							{[...Array(tournament?.players)].map((_, index) => (
								<Form.Item
									key={index}
									name={["playerNames", index]}
									rules={[
										{ required: true, message: "Please enter player name" },
									]}>
									<Input placeholder={`Player ${index + 1}`} />
								</Form.Item>
							))}
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									disabled={remainingSpots <= 0 || alreadyJoined}>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				<div className="reserve-info w-full bg-white px-3 py-2 rounded-lg">
					<p className="p-0 m-0 text-4xl text-main">{tournament?.title}</p>
					<p className="text-3xl">Type: {tournament?.type}</p>
					<p className="text-3xl">Max of Players: {tournament?.players}</p>
					<p className="text-3xl">
						Incription fee: {tournament?.fees}{" "}
						<span className="text-sm">$</span>
					</p>
					<p className="text-3xl">
						Remaining spots:{" "}
						<b className={`${remainingSpots <= 3 ? "text-red-400" : ""}`}>
							{remainingSpots}
						</b>
					</p>
					{alreadyJoined && <b className="text-red-500"> you have already joined this tournament!!</b>}
				</div>
			</div>
		</div>
	);
};

export default Reservation;
