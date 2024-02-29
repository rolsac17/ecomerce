import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getSessionStorage from '@utils/get-session-storage';
import { IUserResponse } from 'interfaces/IAuth';
import { ICurrentUser } from 'interfaces/IUser';
import Cookies from 'js-cookie';
import { AppState } from 'redux/app/store';

export interface ILoginState {
  isLoading: boolean;
  isLoggedIn: boolean;
  success: boolean;
  error: boolean;
  user: IUserResponse;
  currentUser: ICurrentUser;
  showModal: boolean;
  authenticationSteps: number;
  message: string;
}

const {
  token,
  name,
  surnames,
  type,
}: { token: string; name: string; surnames: string; type: any } =
  getSessionStorage('auth')! || false;

const isLoggedIn = token ? true : false;

const userProfile: IUserResponse = {
  name: name ? name : '',
  surnames: surnames ? surnames : '',
  type: type ? type : '',
  token: token ? token : '',
};

const {
  userId,
  email,
  dpi,
  name: currentName,
  surnames: currentSurname,
  birthDate,
  cellPhone,
  phone,
  referenceAddress,
  cityId,
  cityName,
  stateId,
  stateName,
  countryId,
  countryName,
}: ICurrentUser = Cookies.get('currentUser')
  ? JSON.parse(Cookies.get('currentUser')!)
  : {};

const currentUser: ICurrentUser = {
  userId: userId ? userId : '',
  email: email ? email : '',
  dpi: dpi ? dpi : '',
  name: currentName ? currentName : '',
  surnames: currentSurname ? currentSurname : '',
  birthDate: birthDate ? birthDate : '',
  cellPhone: cellPhone ? cellPhone : '',
  phone: phone ? phone : '',
  referenceAddress: referenceAddress ? referenceAddress : '',
  cityId: cityId ? cityId : '',
  cityName: cityName ? cityName : '',
  stateId: stateId ? stateId : '',
  stateName: stateName ? stateName : '',
  countryId: countryId ? countryId : '',
  countryName: countryName ? countryName : '',
};

const initialState: ILoginState = {
  isLoading: false,
  isLoggedIn,
  success: false,
  error: false,
  user: userProfile,
  currentUser,
  showModal: false,
  authenticationSteps: 0,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state) => {
      state.success = true;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserResponse>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setAuthenticationSteps: (state, action: PayloadAction<number>) => {
      state.authenticationSteps = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<ICurrentUser>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state = {
        ...initialState,
      };
      Cookies.remove('currentUser');
      Cookies.remove('token');
      sessionStorage.removeItem('auth');
      window.location.href = '/';
    },
  },
});

export const {
  setLoading,
  setSuccess,
  setError,
  setUser,
  setMessage,
  setShowModal,
  setAuthenticationSteps,
  setCurrentUser,
  logout,
} = authSlice.actions;

export const selectAuth = (state: AppState) => state.auth;
export default authSlice.reducer;
