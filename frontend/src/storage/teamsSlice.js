import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

const initialState = {
	allTeams: [],
	players: [],
	teamsIsLoading: false,
	teamsError: null,
	captainTeam: {
		team: null,
		players: [],
		games: [],
		tournament: null,
	},
};

export const createTeam = createAsyncThunk(
	"team/createTeam",
	async (teamData, thunkAPI) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/teams/store",
				teamData
			);
			message.success("You have joined the tournament successfully ");
			return response.data;
		} catch (error) {
			console.log(error.message);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const getTeams = createAsyncThunk("team/getTeams", async () => {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/teams");
		return response.data;
	} catch (error) {
		console.log("error: ", error);
		throw error;
	}
});

export const getCaptainTeam = createAsyncThunk(
	"team/getCaptainTeam",
	async (captainId, thunkAPI) => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/teams/my-team/${captainId}`
			);
			return response.data;
		} catch (error) {
			console.log(error.message);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const teamsSlice = createSlice({
	name: "team",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTeams.pending, (state) => {
				state.teamsIsLoading = true;
				state.teamsError = null;
			})
			.addCase(getTeams.fulfilled, (state, action) => {
				state.teamsIsLoading = false;
				state.allTeams = action.payload;
				state.teamsError = null;
			})
			.addCase(getTeams.rejected, (state, action) => {
				state.teamsIsLoading = false;
				state.teamsError = action.error.message;
			})
			.addCase(createTeam.pending, (state) => {
				state.teamsIsLoading = true;
			})
			.addCase(createTeam.fulfilled, (state, action) => {
				state.teamsIsLoading = false;
				state.allTeams.push(action.payload.team);
				state.players.push(action.payload.players);
			})
			.addCase(createTeam.rejected, (state, action) => {
				state.teamsIsLoading = false;
				state.teamsError = action.payload;
			})
			.addCase(getCaptainTeam.pending, (state) => {
				state.teamsIsLoading = true;
				state.teamsError = null;
			})
			.addCase(getCaptainTeam.fulfilled, (state, action) => {
				state.teamsIsLoading = false;
				state.captainTeam = {
					team: action.payload.team,
					players: action.payload.players,
					games: action.payload.games,
					tournament: action.payload.tournament,
				};
				state.teamsError = null;
			})
			.addCase(getCaptainTeam.rejected, (state, action) => {
				state.teamsIsLoading = false;
				state.teamsError = action.error.message;
			});
	},
});

export default teamsSlice.reducer;
