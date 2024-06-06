import React, { useEffect, useState } from "react";
import { getUsers } from "../storage/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import UserItem from "./userItem";
import { FaSearch } from "react-icons/fa";

export default function UsersList() {
	const dispatch = useDispatch();
	const { users, usersIsLoading } = useSelector((state) => state.users);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.phone.includes(searchQuery)
	);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div className="pt-2">
			<div className="flex items-center justify-center mb-4">
				<input
					type="text"
					placeholder="Search by name, email, or phone"
					value={searchQuery}
					onChange={handleSearchChange}
					className="border border-gray-300 px-4 py-2 mr-2 rounded-md w-2/4"
				/>
				<FaSearch className="text-gray-600" />
			</div>
			{filteredUsers.length === 0 ? (
				<p>No users found</p>
			) : (
				<table className="w-full">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
								<th>Phone</th>
								<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user) => (
							<UserItem key={user.id} user={user} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
