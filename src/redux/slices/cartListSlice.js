import { createSlice } from "@reduxjs/toolkit";

const cartListSlice = createSlice({
	name: "cartList",
	initialState: {
		data: null,
		count: null,
	},
	reducers: {
		setList(state, action) {
			state.data = action.payload;
		},
		setCount(state, action) {
			state.count = action.payload;
		},
	},
});

export const { setList, setCount } = cartListSlice.actions;
export default cartListSlice.reducer;
