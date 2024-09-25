import { configureStore } from "@reduxjs/toolkit";
import userLoggedSlice from "./slices/userLoggedSlice";

const store = configureStore({
	reducer: {
		userLogged: userLoggedSlice,
	},
});

export default store;
