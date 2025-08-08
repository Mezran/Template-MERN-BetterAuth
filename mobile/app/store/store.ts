import { configureStore } from "@reduxjs/toolkit";

// Example slice for demonstration
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Example app slice
interface AppState {
  isLoading: boolean;
  user: string | null;
}

const initialState: AppState = {
  isLoading: false,
  user: null,
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
    },
  },
});

export const { setLoading, setUser } = appSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
