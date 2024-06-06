import React, { useEffect, useState } from "react";
import { getBikes } from "../storage/bikesSlice";
import { useSelector, useDispatch } from "react-redux";
import BikeItem from "./bikeItem";
import { FaSearch } from "react-icons/fa";

export default function BikesList() {
	const dispatch = useDispatch();
	const { activity} = useSelector((state) => state.activity);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		dispatch(getBikes());
	}, [dispatch]);

	const filteredBikes = activity.filter(
		(bike) =>
			bike.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
							<th>Number of players</th>
							<th>Inscription fee </th>
							<th>Mode</th>
							<th>Tournament</th>
							<th>Disponible</th>
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
