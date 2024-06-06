import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import Cookies from 'js-cookie';

const initialState = {
	tournaments: [],
	tatournamentsIsLoading: false,
	tournamentsError: null,
};

const getTournaments = createAsyncThunk("getTournaments", async () => {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/tournaments")
		return response.data;
	} catch (error) {
		console.log("error : ", error);
		throw error;
	}
});

const addBike = createAsyncThunk("addBike", async (formData) => {
	try {
		const token = Cookies.get("token");
		const response = await axios.post(
			"http://127.0.0.1:8000/api/bikes",
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);
		message.success("Tournament added successfully"); 
		return response.data.bike; 
	} catch (error) {
		console.error("Error adding tournament:", error);
		throw error;
	}
});


const deleteBike = createAsyncThunk("deleteBike", async (bikeId) => {
	try {
		const token = Cookies.get("token");
		await axios.delete(`http://127.0.0.1:8000/api/bikes/${bikeId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		message.success("Tournament deleted successfully");
		return bikeId;
	} catch (error) {
		console.error("Error deleting Tournament:", error);
		throw error;
	}
});

const tournamentsSlice = createSlice({
	name: "tournaments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTournaments.pending, (state) => {
				state.tatournamentsIsLoading = true;
				state.tournamentsError = null;
			})
			.addCase(getTournaments.fulfilled, (state, action) => {
				state.tatournamentsIsLoading = false;
				state.tournaments = action.payload;
				state.tournamentsError = null;
			})
			.addCase(getTournaments.rejected, (state, action) => {
				state.tatournamentsIsLoading = false;
				state.tournamentsError = action.error.message;
			})
			.addCase(deleteBike.pending, (state) => {
				state.tatournamentsIsLoading = true;
				state.tournamentsError = null;
			})
			.addCase(deleteBike.fulfilled, (state, action) => {
				state.tatournamentsIsLoading = false;
				state.tournaments = state.tournaments.filter((user) => {
					user.id != action.payload;
				});
				state.tournamentsError = null;
			})
			.addCase(deleteBike.rejected, (state, action) => {
				state.tatournamentsIsLoading = false;
				state.tournamentsError = action.error.message;
			})
			.addCase(addBike.pending, (state) => {
				state.tatournamentsIsLoading = true;
				state.tournamentsError = null;
			})
			.addCase(addBike.fulfilled, (state, action) => {
				state.tatournamentsIsLoading = false;
				state.tournaments.push(action.payload); 
				state.tournamentsError = null;
			})
			.addCase(addBike.rejected, (state, action) => {
				state.tatournamentsIsLoading = false;
				state.tournamentsError = action.error.message;
			});
	},
});

export { getTournaments, deleteBike , addBike};
export default tournamentsSlice.reducer;
