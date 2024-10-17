import { configureStore } from "@reduxjs/toolkit";
import userLoggedSlice from "./slices/userLoggedSlice";
import cartListSlice from "./slices/cartListSlice";

const store = configureStore({
	reducer: {
		userLogged: userLoggedSlice,
		cartList: cartListSlice,
	},
});

export default store;
