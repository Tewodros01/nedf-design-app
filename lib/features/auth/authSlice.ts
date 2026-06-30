import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: "customer" | "admin";
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signUp: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    restoreSession: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { signIn, signUp, signOut, restoreSession } = authSlice.actions;
export default authSlice.reducer;
