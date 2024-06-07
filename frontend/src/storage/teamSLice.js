import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

const initialState = {
	teams: [],
	players: [],
	status: "idle",
	error: null,
};

export const createTeam = createAsyncThunk(
	"team/createTeam",
    async (teamData, thunkAPI) => {
        console.log(teamData);
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/teams",
				teamData
            );
            message.success('You have joind the tournament successfully ')
            return response.data.team
        } catch (error) {
            console.log(error.message);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const teamSlice = createSlice({
	name: "team",
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTeam.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createTeam.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.teams.push(action.payload.team);
				state.players.push(action.payload.players);
			})
			.addCase(createTeam.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export default teamSlice.reducer;
