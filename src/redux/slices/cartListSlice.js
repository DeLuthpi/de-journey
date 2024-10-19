import { createSlice } from "@reduxjs/toolkit";

const cartListSlice = createSlice({
	name: "cartList",
	initialState: {
		data: null,
		count: null,
		listChecked: [],
		totalAmount: 0,
	},
	reducers: {
		setList(state, action) {
			state.data = action.payload;
		},
		setCount(state, action) {
			state.count = action.payload;
		},
		setListChecked(state, action) {
			state.listChecked = action.payload;
		},
		setAmount(state, action) {
			state.totalAmount = action.payload;
		},
		setTotalAmount(state, action) {
			state.totalAmount += action.payload;
		},
	},
});

export const { setList, setCount, setListChecked, setAmount, setTotalAmount } = cartListSlice.actions;
export default cartListSlice.reducer;
