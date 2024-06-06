import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Chart as ChartJS } from "chart.js";

export default function Charts({ bikes, users, rentals }) {
	const userChartRef = useRef(null);
	const bikeChartRef = useRef(null);

	useEffect(() => {
		// Function to extract the last 7 days from current date
		const getLast7Days = () => {
			const dates = [];
			for (let i = 6; i >= 0; i--) {
				const date = new Date();
				date.setDate(date.getDate() - i);
				dates.push(date.toISOString().split("T")[0]);
			}
			return dates;
		};

		// Data for user chart (number of joined users in the last 7 days)
		const joinedUsersData = {
			labels: getLast7Days(),
			datasets: [
				{
					label: "Joined Users",
					data: getLast7Days().map(
						(date) =>
							users.filter((user) => user.created_at.split("T")[0] === date)
								.length
					),
					backgroundColor: "rgba(54, 162, 235, 0.2)",
					borderColor: "rgba(54, 162, 235, 1)",
					borderWidth: 1,
				},
			],
		};

		const bikeTypes = [...new Set(bikes.map((bike) => bike.type))];
        const bikeBrands = [...new Set(bikes.map((bike) => bike.brand))];
        
        // TODO :the following chart should display top 5 rented bikes, and top 5 users ith reservations
		const bikeChartData = {
			labels: bikeTypes,
			datasets: bikeBrands.map((brand) => ({
				label: brand,
				data: bikeTypes.map(
					(type) =>
						bikes.filter((bike) => bike.type === type && bike.brand === brand)
							.length
				),
				backgroundColor: ChartJS.defaults.color.background,
				borderColor: ChartJS.defaults.color.borderColor,
				borderWidth: 1,
			})),
		};

		const userChart = new Chart(userChartRef.current, {
			type: "line",
			data: joinedUsersData,
		});

		const bikeChart = new Chart(bikeChartRef.current, {
			type: "bar",
			data: bikeChartData,
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});

		return () => {
			userChart.destroy();
			bikeChart.destroy();
		};
	}, [bikes, users]);

	return (
		<div className="w-full grid grid-cols-2 gap-3 p-4">
			<div>
				<canvas ref={userChartRef}></canvas>
			</div>
			<div>
				<canvas ref={bikeChartRef}></canvas>
			</div>
		</div>
	);
}
