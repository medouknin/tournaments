import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { getTournaments } from "../storage/tournamentSlice";
import BikeItem from "./bikeItem";

export default function BikesList() {
	const dispatch = useDispatch();
	const { tournaments } = useSelector((state) => state.tournaments);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		dispatch(getTournaments());
	}, [dispatch]);

	const filteredBikes = tournaments.filter(
		(bike) =>
			bike.type.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div className="pt-2">
			<div className="flex items-center justify-center mb-4">
				<input
					type="text"
					placeholder="Search by Tournament or Type"
					value={searchQuery}
					onChange={handleSearchChange}
					className="border border-gray-300 px-4 py-2 mr-2 rounded-md w-2/4"
				/>
				<FaSearch className="text-gray-600" />
			</div>
			{filteredBikes.length === 0 ? (
				<p>No Tournament  found</p>
			) : (
				<table className="w-full">
					<thead>
						<tr>
							<th>Type</th>
							<th>Number of teams</th>
							<th>Inscription fee </th>
							<th>Plauyers per team</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{filteredBikes.map((bike) => (
							<BikeItem key={bike.id} bike={bike} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
