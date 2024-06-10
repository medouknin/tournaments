import { configureStore } from "@reduxjs/toolkit";
import tournamentsSlice from "./tournamentSlice"
import usersSlice from "./usersSlice";
import teamsSlice from "./teamsSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		tournaments: tournamentsSlice,
		teams: teamsSlice,
	},
});

export default store;
