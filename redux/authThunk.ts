// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   registerUser,
//   loginUser,
//   currentUser,
//   logoutUser,
//   setToken,
//   clearToken,
//  } from "@/lib/api";

// export const registerUserThunk = createAsyncThunk(
//   "auth/register",
//   async ({ name, email, password }, thunkApi) => {
//     try {
//       const response = await registerUser(name, email, password);
//       setToken(response.token);
//       return response;
//     } catch (error) {
//       thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const loginUserThunk = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, thunkApi) => {
//     try {
//       const response = await loginUser(email, password);
//       setToken(response.token);
//       return response;
//     } catch (error) {
//       thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const currentUserThunk = createAsyncThunk(
//   "auth/current",
//   async (_, thunkApi) => {
//     const state = thunkApi.getState();
//     const token = state.auth.token;

//     if (!token) return thunkApi.rejectWithValue(null);
//     try {
//       setToken(token);
//       const response = await currentUser();
//       return response;
//     } catch (error) {
//       thunkApi.rejectWithValue(null);
//     }
//   }
// );

// export const logoutUserThunk = createAsyncThunk(
//   "auth/logout",
//   async (_, thunkApi) => {
//     try {
//       const response = await logoutUser();
//       clearToken();
//       return response;
//     } catch (error) {
//       thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
