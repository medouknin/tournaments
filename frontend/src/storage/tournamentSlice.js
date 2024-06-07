import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	tournaments: [],
	tournamentsIsLoading: false,
	tournamentsError: null,
	games: [], 
	gamesIsLoading: false,
	gamesError: null,
};

const getTournaments = createAsyncThunk(
	"tournaments/getTournaments",
	async () => {
		try {
			const response = await axios.get("http://127.0.0.1:8000/api/tournaments");
			return response.data;
		} catch (error) {
			console.log("error: ", error);
			throw error;
		}
	}
);

// New thunk to fetch games by tournament ID
const getGamesByTournament = createAsyncThunk(
	"tournaments/getGamesByTournament",
	async (id) => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/tournaments/${id}/games`
			);
			return response.data.games;
		} catch (error) {
			console.log("error: ", error);
			throw error;
		}
	}
);

const tournamentsSlice = createSlice({
	name: "tournaments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTournaments.pending, (state) => {
				state.tournamentsIsLoading = true;
				state.tournamentsError = null;
			})
			.addCase(getTournaments.fulfilled, (state, action) => {
				state.tournamentsIsLoading = false;
				state.tournaments = action.payload;
				state.tournamentsError = null;
			})
			.addCase(getTournaments.rejected, (state, action) => {
				state.tournamentsIsLoading = false;
				state.tournamentsError = action.error.message;
			})
			// Extra reducers for handling games
			.addCase(getGamesByTournament.pending, (state) => {
				state.gamesIsLoading = true;
				state.gamesError = null;
			})
			.addCase(getGamesByTournament.fulfilled, (state, action) => {
				state.gamesIsLoading = false;
				state.games = action.payload;
				state.gamesError = null;
			})
			.addCase(getGamesByTournament.rejected, (state, action) => {
				state.gamesIsLoading = false;
				state.gamesError = action.error.message;
			});
	},
});

export { getTournaments, getGamesByTournament };
export default tournamentsSlice.reducer;
