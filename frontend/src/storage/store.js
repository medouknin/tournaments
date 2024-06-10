import { configureStore } from "@reduxjs/toolkit";
import tournamentsSlice from "./tournamentSlice"
import usersSlice from "./usersSlice";

const store = configureStore({
	reducer: {
		users: usersSlice,
		tournaments: tournamentsSlice,
	},
});

export default store;
