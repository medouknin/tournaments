import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cancelRental } from "../storage/rentalsSlice";
import { Popconfirm, message } from "antd";

const UserRentalItem = ({ userRental, activity }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [confirmCancel, setConfirmCancel] = useState(false);

	useEffect(() => {
		if (!userRental) {
			navigate("/home");
		}
	}, [navigate, userRental]);

	const handleCancel = () => {
		dispatch(cancelRental(userRental.id));
		setConfirmCancel(false);
	};

	const bike = activity.find((bike) => bike.id === userRental.bike_id);

	return (
		<tr>
			<td>{bike?.brand}</td>
			<td>{bike?.type}</td>
			<td>{userRental.start_date}</td>
			<td>{userRental.end_date}</td>
			<td>{userRental.total_price}$</td>
			<td>{userRental.status}</td>
			<td className="flex gap-3 py-1">
				<Link to={`/reserve/${bike?.id}`} className="no-underline">
					<button className="btn btn-outline-primary">join Again</button>
				</Link>
				<Popconfirm
					title="Are you sure you want to cancel this rental?"
					open={confirmCancel}
					onConfirm={handleCancel}
					onCancel={() => setConfirmCancel(false)}
					okText="Yes"
					cancelText="No">
					<button
						className="btn btn-danger"
						disabled={userRental.status !== "Not Started"}
						onClick={() => setConfirmCancel(true)}>
						Cancel
					</button>
				</Popconfirm>
			</td>
		</tr>
	);
};

export default UserRentalItem;
