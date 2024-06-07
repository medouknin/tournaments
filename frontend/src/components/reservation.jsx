import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRentals } from "../storage/rentalsSlice";
import moment from "moment";
import { createTeam } from "../storage/teamSLice";

const Reservation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
	const { tournaments, tournamentsIsLoading } = useSelector(
		(state) => state.tournaments
	);
	const tournament = tournaments.find((tour) => tour.id == id);

	useEffect(() => {
		dispatch(getRentals());
	}, [dispatch]);

    const onFinish = (values) => {
        values.captainId = user.id;
        values.tournamentId = parseInt(id);
        dispatch(createTeam(values));
        navigate('/home');
	};

	return (
		<div className="container p-5">
			<div className="reserve-bike grid grid-cols-3 gap-4">
				<div className="reser-img-form col-span-2 w-full bg-white rounded-lg">
					<div className=" flex justify-center h-80 overflow-hidden p-2">
						<img src={tournament?.TourPhoto} alt="" className="h-full" />
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
							{[...Array(tournament?.number_of_players)].map((_, index) => (
								<Form.Item
									key={index}
									name={["playerNames", index]} // Removed square brackets
									rules={[
										{ required: true, message: "Please enter player name" },
									]}>
									<Input placeholder={`Player ${index + 1}`} />
								</Form.Item>
							))}
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				<div className="reserve-info w-full bg-white px-3 py-2 rounded-lg">
					<p className="p-0 m-0 text-4xl text-main">{tournament?.name}</p>
					<p className=" text-3xl">Type : {tournament?.tournamentType}</p>
					<p className=" text-3xl">
						Max of Players : {tournament?.number_of_players}
					</p>
					<p className="text-3xl">
						Incription fee : {tournament?.fees}{" "}
						<span className="text-sm"> $</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Reservation;
