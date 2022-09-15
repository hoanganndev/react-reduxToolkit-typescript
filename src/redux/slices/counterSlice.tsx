// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// import { fetchUsersData } from "../../services/userService";

// // Create the thunk
// export const fetchAllUsers = createAsyncThunk(
//   "users/fetchAllUsers", //action
//   async (userId: number, thunkAPI) => {
//     const response = await fetchUsersData();
//     return response;
//   }
// );

// export interface CounterState {
//   value: number;
// }

// const initialState: CounterState = {
//   value: 0,
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: state => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers.
//       state.value += 1;
//     },
//     decrement: state => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;
import React from "react";

const counterSlice = () => {
  return <div>check me</div>;
};

export default counterSlice;
