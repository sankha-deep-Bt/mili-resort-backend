// // src/store/auth/authSlice.ts
// import { createSlice } from "@reduxjs/toolkit";
// import {
//   loginThunk,
//   logoutThunk,
//   refreshThunk,
//   signUpThunk,
// } from "./authThunks";

// type AuthState = {
//   user: null | {
//     userId: string;
//     role: string;
//   };
//   isLoading: boolean;
//   isAuth: boolean;
//   error: string | null;
// };

// const initialState: AuthState = {
//   user: null,
//   isLoading: true,
//   isAuth: false,
//   error: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     // ⭐ SIGNUP
//     builder.addCase(signUpThunk.pending, (state) => {
//       state.isLoading = true;
//       state.error = null;
//     });
//     builder.addCase(signUpThunk.fulfilled, (state, action) => {
//       state.user = action.payload;
//       state.isAuth = true;
//       state.isLoading = false;
//       state.error = null;
//     });
//     builder.addCase(signUpThunk.rejected, (state, action) => {
//       state.error = action.payload as string;
//       state.isLoading = false;
//       state.isAuth = false;
//     });

//     // LOGIN
//     builder.addCase(loginThunk.pending, (state) => {
//       state.isLoading = true;
//       state.error = null;
//     });
//     builder.addCase(loginThunk.fulfilled, (state, action) => {
//       state.user = action.payload;
//       state.isAuth = true;
//       state.isLoading = false;
//       state.error = null;
//     });
//     builder.addCase(loginThunk.rejected, (state, action) => {
//       state.error = action.payload as string;
//       state.isLoading = false;
//       state.isAuth = false;
//     });

//     // REFRESH
//     builder.addCase(refreshThunk.fulfilled, (state, action) => {
//       state.user = action.payload;
//       state.isAuth = true;
//       state.isLoading = false;
//     });
//     builder.addCase(refreshThunk.rejected, (state) => {
//       state.user = null;
//       state.isAuth = false;
//       state.isLoading = false;
//     });

//     // LOGOUT
//     builder.addCase(logoutThunk.fulfilled, (state) => {
//       state.user = null;
//       state.isAuth = false;
//       state.isLoading = false;
//     });
//   },
// });

// export default authSlice.reducer;

// src/store/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  signUpThunk,
} from "./authThunks";

type AuthState = {
  user: null | {
    userId: string;
    role: string;
  };
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuth: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // ⭐ SIGNUP
    builder.addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
      state.isAuth = false;
    });

    // ⭐ LOGIN
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
      state.isAuth = false;
    });

    // ⭐ REFRESH (Auto logout if no access token)
    builder.addCase(refreshThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    });

    builder.addCase(refreshThunk.rejected, (state) => {
      // Auto logout on refresh failure
      state.user = null;
      state.isAuth = false;
      state.isLoading = false;
    });

    // ⭐ LOGOUT
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.isAuth = false;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
