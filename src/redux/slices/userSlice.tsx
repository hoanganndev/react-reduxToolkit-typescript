import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

export interface dataLoginProps {
  email: string;
  password: string;
}

interface info {
  email: string;
  token: string;
  auth: boolean;
}

interface UsersState {
  account: info;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UsersState = {
  account: {
    email: "",
    token: "",
    auth: false,
  },
  isLoading: false,
  isError: false,
};

// create the thunk
export const handleLoginRedux = createAsyncThunk(
  "user/login-redux", // action
  async (dataInput: dataLoginProps, thunkAPI) => {
    const { email, password } = dataInput;
    const response = await loginUser(email.trim(), password);
    response.email = email;
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogoutRedux: state => {
      //remove local storage
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      //update state
      state.account.email = "";
      state.account.token = "";
      state.account.auth = false;
      state.isLoading = false;
      state.isError = false;
    },
    decrement: state => {
      // state.value -= 1;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(handleLoginRedux.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(handleLoginRedux.fulfilled, (state, action) => {
        if (action.payload.token) {
          //save local storage
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("email", action.payload.email);
          //update state
          state.account.email = action.payload.email;
          state.account.token = action.payload.token;
          state.account.auth = true;
          state.isLoading = false;
          state.isError = false;
        } else {
          state.isLoading = false;
          state.isError = true;
          toast.warning(action.payload.error);
        }
      })
      .addCase(handleLoginRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { handleLogoutRedux } = userSlice.actions;

export default userSlice.reducer;
