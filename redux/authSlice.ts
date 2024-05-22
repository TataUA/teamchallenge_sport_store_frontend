import { createSlice } from "@reduxjs/toolkit";
// import {
//   registerUserThunk,
//   loginUserThunk,
//   currentUserThunk,
//   logoutUserThunk,
// } from "./authThunk";

// export interface UserState {
//   userData: string | null; //??
//   token: string | null;
//   authentication: boolean;
//   isLoading: boolean;
//   isRefreshing: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   userData: null,
//   token: null,
//   authentication: false,
//   isLoading: false,
//   isRefreshing: true,
//   error: null,
// };

// const authSlice = createSlice({
//         name: "auth",
//         initialState,
//         extraReducers: (builder) =>
//             builder
//               //register
//               .addCase(registerUserThunk.pending, (state) => {
//                 state.isLoading = true;
//                 state.authentication = false;
//                 state.error = null;
//               })
//               .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.authentication = true;
//                 state.userData = payload.user;
//                 state.token = payload.token;
//               })
//               .addCase(registerUserThunk.rejected, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.error = payload;
//               })

//               //login
//               .addCase(loginUserThunk.pending, (state) => {
//                 state.isLoading = true;
//                 state.authentication = false;
//                 state.error = null;
//               })
//               .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.authentication = true;
//                 state.userData = payload.user;
//                 state.token = payload.token;
//               })
//               .addCase(loginUserThunk.rejected, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.error = payload;
//               })

//               //current
//               .addCase(currentUserThunk.pending, (state) => {
//                 state.isLoading = true;
//                 state.authentication = false;
//                 state.error = null;
//               })
//               .addCase(currentUserThunk.fulfilled, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.authentication = true;
//                 state.userData = payload;
//                 state.isRefreshing = false;
//               })
//               .addCase(currentUserThunk.rejected, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.error = payload;
//                 state.isRefreshing = false;
//               })

//               //logout
//               .addCase(logoutUserThunk.pending, (state) => {
//                 state.isLoading = true;
//                 state.authentication = false;
//                 state.error = null;
//               })
//               .addCase(logoutUserThunk.fulfilled, (state) => {
//                 state.isLoading = false;
//                 state.authentication = false;
//                 state.userData = null;
//                 state.token = null;
//               })
//               .addCase(logoutUserThunk.rejected, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.error = payload;
//               }),
//     });

// export const authReducer = authSlice.reducer;
