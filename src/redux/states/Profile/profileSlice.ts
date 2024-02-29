import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/app/store';

export interface IProfileState {
  isLoading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

const initialState: IProfileState = {
  isLoading: false,
  success: false,
  error: false,
  message: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setLoading, setSuccess, setError, setMessage } =
  profileSlice.actions;

export const selectProfile = (state: AppState) => state.profile;
export default profileSlice.reducer;
