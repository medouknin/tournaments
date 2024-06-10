import { configureStore } from "@reduxjs/toolkit";
import tournamentsSlice from "./tournamentSlice"
import usersSlice from "./usersSlice";
import teamsSlice from "./teamsSlice";
import dashboardSlice from "./dashboardSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		tournaments: tournamentsSlice,
		teams: teamsSlice,
		dashboard: dashboardSlice,
	},
});

export default store;
