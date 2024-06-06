import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

const initialState = {
	rentals: [],
	rentalsIsLoading: false,
	rentalsError: null,
	totalIncome : ''
};

const getRentals = createAsyncThunk("getRentals", async () => {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/rental");
		return response.data;
	} catch (error) {
		console.log("error : ", error);
		throw error;
	}
});

const addRental = createAsyncThunk("addRental", async (formData) => {
	try {
		const response = await axios.post("http://127.0.0.1:8000/api/rental", formData);
		message.success("Tournament has been successfully reserved!")

		return response.data;
	} catch (error) {
		throw error;
	}
});

const getTotalIncome = createAsyncThunk("getTotalIncome", async () => {
	try {
		const token = Cookies.get("token");
		const response = await axios.get(
			"http://127.0.0.1:8000/api/rental/total-income",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response.data.total;
	} catch (error) {
		throw error;
	}
});

const cancelRental = createAsyncThunk("rentals/cancelRental", async (id) => {
	try {
		const token = Cookies.get("userToken");
		console.log(token);
		const response = await axios.put(
			`http://127.0.0.1:8000/api/rental/${id}/cancel`,
			null,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response.data.rental;
	} catch (error) {
		throw error;
	}
});

const updateStatuses = createAsyncThunk("updateStatuses", async () => {
	try {
		const response = await axios.get(
			"http://127.0.0.1:8000/api/rental/update-status"
		);
		return null
	} catch (error) {
		throw error;
	}
});


const rentalsSlice = createSlice({
	name: "bikes",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getRentals.pending, (state) => {
				state.rentalsIsLoading = true;
				state.rentalsError = null;
			})
			.addCase(getRentals.fulfilled, (state, action) => {
				state.rentalsIsLoading = false;
				state.rentals = action.payload;
				state.rentalsError = null;
			})
			.addCase(getRentals.rejected, (state, action) => {
				state.rentalsIsLoading = false;
				state.rentalsError = action.error.message;
			})
			.addCase(addRental.pending, (state) => {
				state.rentalsIsLoading = true;
				state.rentalsError = null;
			})
			.addCase(addRental.fulfilled, (state, action) => {
				state.rentalsIsLoading = false;
				state.rentals.push(action.payload); // make sure this is correct
				state.rentalsError = null;
			})
			.addCase(addRental.rejected, (state, action) => {
				state.rentalsIsLoading = false;
				state.rentalsError = action.error.message;
			})
			.addCase(getTotalIncome.pending, (state) => {
				state.rentalsIsLoading = true;
				state.rentalsError = null;
			})
			.addCase(getTotalIncome.fulfilled, (state, action) => {
				state.rentalsIsLoading = false;
				state.totalIncome = action.payload;
				state.rentalsError = null;
			})
			.addCase(getTotalIncome.rejected, (state, action) => {
				state.rentalsIsLoading = false;
				state.rentalsError = action.error.message;
			})
			.addCase(cancelRental.pending, (state) => {
				state.rentalsIsLoading = true;
				state.rentalsError = null;
			})
			.addCase(cancelRental.fulfilled, (state, action) => {
				state.rentalsIsLoading = false;
				const updatedRentals = state.rentals.map((rental) => {
					if (rental.id === action.payload.id) {
						return action.payload; 
					}
					return rental;
				});
				state.rentals = updatedRentals;
				state.rentalsError = null;
			})
			.addCase(cancelRental.rejected, (state, action) => {
				state.rentalsIsLoading = false;
				state.rentalsError = action.error.message;
			});
	},
});

export { getRentals, addRental, getTotalIncome, cancelRental, updateStatuses };
export default rentalsSlice.reducer;