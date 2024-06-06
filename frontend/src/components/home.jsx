import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../storage/bikesSlice";
import { getTournaments } from "../storage/tournamentSlice"; 
import ThumbImage from "../assets/thumb_image.png";
import Loader from "./loader";
import BikeCard from "./bikeCard";
import { Input, Select } from "antd";
import { SlDrawer } from "react-icons/sl";
const { Search } = Input;
const { Option } = Select;

const Home = () => {
	const dispatch = useDispatch();
	const { activity, bikesIsLoading } = useSelector((state) => state.activity);
	const { tournaments, tournamentsIsLoading } = useSelector((state) => state.tournaments);
	const [filteredTournaments, setFilteredTournaments] = useState([]);
	
	const bicycleBrands = [
		"",
		"Football",
		"Tennis",
		"BasketBall",
		"rugby",
		"volyball",
		"running",
		"swimming",
		"Cricket",
		"Golf",
		"Motorsport",
		"Boxing",
	];

	useEffect(() => {
		dispatch(getBikes());
		dispatch(getTournaments());
	}, [dispatch]);

	useEffect(() => {
		setFilteredTournaments(tournaments);
	}, [tournaments]);

	const handleSearch = (value) => {
		const filtered = tournaments.filter((tournament) => {
			return (
				tournament.tournamentType	.toLowerCase().includes(value.toLowerCase())
				// tournament.type.toLowerCase().includes(value.toLowerCase())
			);
		});
		setFilteredTournaments(filtered);
	};

	const handleFilter = (type, value) => {
		if (type === "brand") {
			const filtered = tournaments.filter((tournament) =>
				tournament.tournamentType	.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredTournaments(filtered);
		} else if (type === "type") {
			const filtered = tournaments.filter((tournament) =>
				tournament.tournamentType	.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredTournaments(filtered);
		}
	};

	return (
		<main className="pb-5">
			<div className="thumbnail">
				<h1 className="text-9xl">Tournois sportifs</h1>
				<img src={ThumbImage} alt="" width={500} />
				<div className="text-center pt-3">
					<p className="text-3xl">Find the Tournament that gives you energy!</p>
				</div>
			</div>
			<div className="flex w-full justify-center">
				<div className="search w-2/3 bg-white flex justify-between items-center p-4">
					<div className=" flex">
						<Search
							placeholder="Search about tournaments  "
							onSearch={handleSearch}
							enterButton
						/>
					</div>

					<div className="flex items-center w-1/2 gap-2">
						<p className="text-nowrap pt-3">Choose Tournament</p>
						<Select
							placeholder="Activity"
							className="w-full"
							onChange={(value) => handleFilter("brand", value)}>
							{bicycleBrands.map((brand) => (
								<Option key={brand} value={brand}>
									{brand}
								</Option>
							))}
						</Select>

						{/* <Select
							placeholder="Type"
							className="w-full"
							onChange={(value) => handleFilter("type", value)}>
							{bicycleTypes.map((type) => (
								<Option key={type} value={type}>
									{type}
								</Option>
							))}
						</Select> */}
					</div>
				</div>
			</div>
			{tournamentsIsLoading ? (
				<Loader />
			) : (
				<div className=" container gap-5 listing grid grid-cols-3 w-full mt-5 pt-8">
					{filteredTournaments?.length === 0 ? (
						<div className="col-span-full flex flex-col items-center ">
							<SlDrawer className="text-9xl" />
							<h3 className="text-center">No tournaments found</h3>
						</div>
					) : (
						filteredTournaments?.map((tournament) => {
							return <BikeCard key={tournament.id} tournament={tournament} />;
						})
					)}
				</div>
			)}
		</main>
	);
};

export default Home;
