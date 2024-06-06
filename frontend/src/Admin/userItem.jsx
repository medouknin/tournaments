import React from "react";
import { Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { LuMailPlus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { deleteUser } from "../storage/usersSlice";

export default function UserItem({ user }) {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteUser(user.id));
	};

	return (
		<tr>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td>{user.phone}</td>
			<td className="flex gap-1 py-1">
				<Popconfirm
					title="Are you sure you want to delete this user?"
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
				<button className="btn btn-success">
					<div className="flex gap-1">
						<LuMailPlus className="mt-1" />
						<span>Contact</span>
					</div>
				</button>
			</td>
		</tr>
	);
}
