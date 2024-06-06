import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import Cookies from 'js-cookie';

const initialState = {
	activity: [],
	activityIsLoading: false,
	activityError: null,
};

const getBikes = createAsyncThunk("getBikes", async () => {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/bikes")
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

const bikesSlice = createSlice({
	name: "bikes",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getBikes.pending, (state) => {
				state.activityIsLoading = true;
				state.activityError = null;
			})
			.addCase(getBikes.fulfilled, (state, action) => {
				state.activityIsLoading = false;
				state.activity = action.payload;
				state.activityError = null;
			})
			.addCase(getBikes.rejected, (state, action) => {
				state.activityIsLoading = false;
				state.activityError = action.error.message;
			})
			.addCase(deleteBike.pending, (state) => {
				state.activityIsLoading = true;
				state.activityError = null;
			})
			.addCase(deleteBike.fulfilled, (state, action) => {
				state.activityIsLoading = false;
				state.activity = state.activity.filter((user) => {
					user.id != action.payload;
				});
				state.activityError = null;
			})
			.addCase(deleteBike.rejected, (state, action) => {
				state.activityIsLoading = false;
				state.activityError = action.error.message;
			})
			.addCase(addBike.pending, (state) => {
				state.activityIsLoading = true;
				state.activityError = null;
			})
			.addCase(addBike.fulfilled, (state, action) => {
				state.activityIsLoading = false;
				state.activity.push(action.payload); 
				state.activityError = null;
			})
			.addCase(addBike.rejected, (state, action) => {
				state.activityIsLoading = false;
				state.activityError = action.error.message;
			});
	},
});

export { getBikes, deleteBike , addBike};
export default bikesSlice.reducer;
