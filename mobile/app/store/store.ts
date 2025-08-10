import { configureStore } from "@reduxjs/toolkit";

// Example slice for demonstration
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Example app slice
interface AppState {
  isLoading: boolean;
  user: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
}

const initialState: AppState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setAuthChecking: (state, action: PayloadAction<boolean>) => {
      state.isCheckingAuth = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setLoading, setUser, setAuthChecking, logout } = appSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
