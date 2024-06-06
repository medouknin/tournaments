import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserIcon from "../assets/user-icon.svg";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { TbUserEdit } from "react-icons/tb";
import { getRentals } from "../storage/rentalsSlice";
import { getBikes } from "../storage/bikesSlice";
import { useDispatch, useSelector } from "react-redux";
import { SlDrawer } from "react-icons/sl";
import UserRentalItem from "./userRentalItem";


export default function UserProfile() {
	const dispatch = useDispatch();
	const { rentals, rentalsIsLoading } = useSelector((state) => state.rentals);
	const { activity, bikesIsLoading } = useSelector((state) => state.activity);
	let { id } = useParams();
	id = JSON.parse(atob(id));
	const userRentals = rentals.filter((rental) => rental.user_id == id);

	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		dispatch(getRentals());
		dispatch(getBikes());
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
			<span className="mt-4 bg-gray-200 px-2 z-10">History</span>
			<div className=" line border-solid border-black border-1 w-full "></div>
			<div className="px-10 w-full bg-white mt-4 py-4 rounded-lg">
				{userRentals.length == 0 ? (
					<div className="flex flex-col justify-center items-center">
						<SlDrawer className="text-9xl" />
						<p className="ml-2">
							Nothing to see yet, <Link to={"/home"}>book</Link> your first
							reservation
						</p>
					</div>
				) : (
					<table className="w-full">
						<thead>
							<tr>
								<th>Activity</th>
								<th>Type</th>
								<th>Start Date</th>
								<th>End Date</th>
								{/* <th>Total Price</th> */}
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{userRentals.map((userRental) => (
								<UserRentalItem
									key={userRental.id}
									userRental={userRental}
									activity={activity}
								/>
							))}
						</tbody>
					</table>
				)}
			</div>
		</main>
	);
}
