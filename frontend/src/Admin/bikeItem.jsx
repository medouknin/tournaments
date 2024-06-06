import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteBike } from "../storage/bikesSlice";
import { Popconfirm } from "antd";

export default function BikeItem({ bike }) {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteBike(bike.id));
	};
	return (
		<tr>
			<td>{bike.type}</td>
			<td>{bike.size}</td>
			<td>{bike.price_per_hour}$</td>
			<td>{bike.material}</td>
			<td>{bike.brand}</td>
			<td>
				{!bike.isRented ? (
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 bg-green-200 rounded-xl"></div>
						Yes
					</div>
				) : (
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 bg-red-200 rounded-xl"></div>
						No
					</div>
				)}
			</td>
			<td className=" flex gap-1 py-1">
				<button className="btn btn-primary  ">Edit</button>
				<Popconfirm
					title="Are you sure you want to delete this Tournament?"
					okText="Yes"
					cancelText="Cancel"
					onConfirm={handleDelete}>
					<button className="btn btn-danger">
						<div className="flex gap-1">
							<FaTrashAlt className="mt-1" />
							<span>Delete</span>
						</div>
					</button>
				</Popconfirm>
			</td>
		</tr>
	);
}
