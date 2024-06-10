import React, {useEffect} from "react";
import { FaUsers } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { getUsers } from "../storage/usersSlice";
import { useDispatch, useSelector } from 'react-redux';
import Charts from "./chatrs";
import { getTournaments } from "../storage/tournamentSlice";


export default function Statistics() {
	const dispatch = useDispatch();
	const { users, usersIsLoading } = useSelector((state) => state.users);
	const { tournaments } = useSelector(state => state.tournaments);



	useEffect(() => {
		dispatch(getTournaments());
		dispatch(getUsers());
	}, [dispatch]);
	return (
		<div className="p-3 flex flex-col gap-3">
			<div className=" flex gap-3 justify-between">
				<div className="stats-card bg-red-400">
					<div>
						<h4>Users</h4>
						<p className="text-4xl">{users.length}</p>
					</div>
					<div className="stats-card-icon">
						<FaUsers className="text-9xl" />
					</div>
				</div>
				<div className=" stats-card bg-yellow-400 ">
					<div className="w-2/4">
						<h4>Tournaments</h4>
						<p className="text-4xl">
							{tournaments.length}
						</p>
					</div>
					<div className="stats-card-icon">
						<TbTournament className="text-9xl" />
					</div>
				</div>

				<div className=" stats-card bg-green-400 ">
					<div>
						<h4>Income</h4>
						{/* <p className="text-4xl text-nowrap">
							{totalIncome} <span className="text-xl">$</span>
						</p> */}
					</div>
					<div className="stats-card-icon">
						<GrMoney className="text-9xl" />
					</div>
				</div>
			</div>
			<Charts users={users} bikes={tournaments}  />
		</div>
	);
}
