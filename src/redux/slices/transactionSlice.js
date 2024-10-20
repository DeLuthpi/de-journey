import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
	name: "transaction",
	initialState: {
		data: null,
	},
	reducers: {
		setTransaction(state, action) {
			state.data = action.payload;
		},
	},
});

export const { setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
