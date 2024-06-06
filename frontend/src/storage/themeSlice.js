import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isDark: false, 
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleThemeMode: (state) => {
			state.isDark = !state.isDark;
		},
		setThemeMode: (state, action) => {
			state.isDark = action.payload;
		},
	},
});

export const { toggleThemeMode, setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
