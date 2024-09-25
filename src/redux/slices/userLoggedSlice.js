import { createSlice } from "@reduxjs/toolkit";

const userLoggedSlice = createSlice({
	name: "userLogged",
	initialState: {
		user: null,
	},
	reducers: {
		setData(state, action) {
			state.user = action.payload;
		},
	},
});

export const { setData } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
