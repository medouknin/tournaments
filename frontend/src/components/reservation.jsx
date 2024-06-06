import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../storage/bikesSlice";
import { addRental, getRentals } from "../storage/rentalsSlice";
import { Form, DatePicker, Button, Input, InputNumber} from "antd";
import moment from "moment";

const Reservation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const user = JSON.parse(localStorage.getItem("user"));
	const { activity } = useSelector((state) => state.activity);
	const { rentals } = useSelector((state) => state.rentals);
	const bike = activity.find((bike) => bike.id == id);
	const bikeIsRented = rentals.filter((rental) => rental.bike_id == id);
	let bikeReturnDate;

	useEffect(() => {
		dispatch(getBikes());
		dispatch(getRentals());
	}, [dispatch]);



	const isBikeCurrentlyRented = () => {
		if (!bikeIsRented || bikeIsRented.length === 0) {
			return false;
		}

		const currentDate = moment();

		for (let i = 0; i < bikeIsRented.length; i++) {
			const rental = bikeIsRented[i];
			const startDate = moment(rental.start_date);
			const endDate = moment(rental.end_date);

			if (currentDate.isBetween(startDate, endDate)) {
				bikeReturnDate = endDate.format("YYYY-MM-DD");
				return true;
			}
		}

		return false;
	};

	
	const [form] = Form.useForm();
	const [totalPrice, setTotalPrice] = useState(0);
	const [dates, setDates] = useState({
		start: null,
		end: null,
	});

	const handleStartDate = (date) => {
		setDates({ ...dates, start: date });
	};

	const handleEndDate = (date) => {
		setDates({ ...dates, end: date });

		const hoursDiff = Math.abs(date.diff(dates.start, "hours"));
		const totalPrice = hoursDiff * parseFloat(bike.price_per_hour);
		setTotalPrice(totalPrice);
	};

	const onFinish = () => {
		const rentalData = {
			user_id: user.id,
			bike_id: bike.id,
			start_date: dates.start.format("YYYY-MM-DD"),
			end_date: dates.end.format("YYYY-MM-DD"),
			total_price: totalPrice,
		};
		dispatch(addRental(rentalData));
		navigate('/home')
	};

	return (
		<div className="container p-5">
			<div className="reserve-bike grid grid-cols-3 gap-4">
				<div className="reser-img-form col-span-2 w-full bg-white rounded-lg">
					<div className="bike-res-img h-80 overflow-hidden grid grid-cols-2  gap-2 p-2">
						<img
							src={`http://127.0.0.1:8000/storage/uploads/${bike?.image}`}
							alt=""
							className="h-full hover:scale-110 duration-300 ease-in-out"
						/>

						<p className="text-justify max-h-80">{bike?.description}</p>
					</div>
					<div className=" container col-span-2">
						<Form
							form={form}
							onFinish={onFinish}
							className="grid grid-cols-2 align-middle">
							

								<h4>Information  about your team</h4>

							<Form.Item 
								label=""
							>
							
							</Form.Item>

							<Form.Item 
								label=" Name of Team :"
							>
							<Input />

							</Form.Item>
							<Form.Item 
								label="Name of Coach  : "
							>
							<Input />

							</Form.Item>
							<Form.Item 
								label="Number of Players :"
							> 
							<InputNumber />
							</Form.Item>
							<Form.Item 
								label="Leader of the Team :"
							> 
							<Input />
							</Form.Item>
							<h4>date that you like the tournament start and end :</h4>

							<Form.Item 
								label=""
							>

							</Form.Item>

							<Form.Item
								label="bigning of Tournament"
								name="begun"
								rules={[
									{ required: true, message: "Please select start date" },
								]}>
								<DatePicker
									placeholder="Start Date"
									onChange={handleStartDate}
									disabledDate={(current) => {
										if (current && current < moment().startOf("day")) {
											return true;
										}

										for (let i = 0; i < bikeIsRented.length; i++) {
											const rental = bikeIsRented[i];
											const startDate = moment(rental.start_date);
											const endDate = moment(rental.end_date);
											if (
												current &&
												current >= startDate &&
												current <= endDate
											) {
												return true;
											}
										}

										if (
											isBikeCurrentlyRented() &&
											current &&
											current < moment(bikeReturnDate)
										) {
											return true;
										}

										return false;
									}}
								/>
							</Form.Item>
							<Form.Item
								label="To"
								name="endDate"
								rules={[
									{ required: true, message: "Please select end date" },
									{
										validator: (_, value) => {
											if (value && value.isBefore(dates.start)) {
												return Promise.reject(
													new Error("End date must be after start date")
												);
											}
											return Promise.resolve();
										},
									},
								]}>
								<DatePicker placeholder="End Date" onChange={handleEndDate} />
							</Form.Item>

							<Form.Item className=" col-span-2 flex justify-center ">
								<Button
									type="primary"
									htmlType="submit"
									className="w-72 bg-main"
									disabled={!dates.start || !dates.end}>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				<div className="reserve-info w-full bg-white px-3 py-2 rounded-lg">
					<p className="p-0 m-0 text-4xl text-main">{bike?.brand}</p>
					<p className=" text-3xl">Type : {bike?.type}</p>
					<p className=" text-3xl">Mode :{bike?.material}</p>
					<p className=" text-3xl">Max of Players : {bike?.size}</p>
					<p className="text-3xl">
						Incription fee : {bike?.price_per_hour} <span className="text-sm"> $</span>
					</p>
					
					{isBikeCurrentlyRented() ? (
						<p>
							*This activity is currently and will be available on{" "}
							<span className="text-red-500">{bikeReturnDate}</span>
						</p>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Reservation;
