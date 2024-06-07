import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import dashboardSlice from "./dashboardSlice";
import usersSlice from "./usersSlice";
import bikesSlice from "./bikesSlice";
import rentalsSlice from "./rentalsSlice";
import tournamentsSlice from "./tournamentSlice"
import teamSLice from "./teamSLice";

const store = configureStore({
	reducer: {
		theme: themeReducer,
		dashboard: dashboardSlice,
		users: usersSlice,
		activity: bikesSlice,
		rentals: rentalsSlice,
		tournaments: tournamentsSlice,
		team: teamSLice,
	},
});

export default store;
