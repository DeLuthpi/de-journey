import { configureStore } from "@reduxjs/toolkit";
import userLoggedSlice from "./slices/userLoggedSlice";
import cartListSlice from "./slices/cartListSlice";
import transactionSlice from "./slices/transactionSlice";

const store = configureStore({
	reducer: {
		userLogged: userLoggedSlice,
		cartList: cartListSlice,
		transaction: transactionSlice,
	},
});

export default store;
