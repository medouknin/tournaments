import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";

export default function BikeItem({ bike }) {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteBike(bike.id));
	};
	return (
		<tr>
			<td>{bike.type}</td>
			<td>{bike.teams}</td>
			<td>{bike.fees}$</td>
			<td>{bike.players}</td>
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
