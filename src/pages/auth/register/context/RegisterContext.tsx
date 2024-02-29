import endPoints from '@services/api';
import axios from 'axios';
import { FC, createContext, useReducer, useContext } from 'react';

interface ContextPropsMethods {
  next: (formRegister: IFormRegister) => void;
  sendOtp: (
    email: IFormRegister
  ) => Promise<{ hasError: boolean; message: string }>;
  signup: (
    formRegister: IFormRegister
  ) => Promise<{ hasError: boolean; message: string }>;
  previous: (formRegister: IFormRegister) => void;
  formComplete: () => void;
  resetState: (formRegister: IFormRegister) => void;
}

interface ContextPropsState {
  steps: number;
  formRegister: IFormRegister;
}

export interface IFormRegister {
  type?: string;
  name?: string;
  dpi?: string;
  warehouseName?: string;
  surnames?: string;
  birthDate?: string;
  cellPhone?: string;
  phone?: string;
  referenceAddress?: string;
  country?: string;
  stateId?: string;
  citiesId?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  registered?:string;
  productsSell?:string;
}

interface FormRegisterState {
  steps: number;
  formRegister: IFormRegister;
}

export const INITIAL_STATE_FORM = {
  type: '',
  name: '',
  dpi: '',
  warehouseName: '',
  surnames: '',
  birthDate: '',
  cellPhone: '',
  phone: '',
  referenceAddress: '',
  country: 'Guatemala',
  stateId: '',
  citiesId: undefined,
  email: '',
  password: '',
  confirmPassword: '',
  otp: '',
  registered: '',
  productsSell: '',
};

export const FORM_REGISTER_INITIAL_STATE: FormRegisterState = {
  steps: 0,
  formRegister: INITIAL_STATE_FORM,
};

type formRegisterActionType =
  | { type: '[Register] - next'; payload: IFormRegister }
  | { type: '[Register] - previous'; payload: IFormRegister }
  | { type: '[Register] - sendOtp' }
  | { type: '[Register] - FormComplete' }
  | { type: '[Register] - resetState'; payload: IFormRegister };

const reducer = (
  state: FormRegisterState,
  action: formRegisterActionType
): FormRegisterState => {
  switch (action.type) {
    case '[Register] - previous':
      return {
        ...state,
        steps: Math.max(state.steps - 1, 0),
        formRegister: { ...state.formRegister, ...action.payload },
      };
    case '[Register] - next':
      return {
        ...state,
        steps: state.steps + 1,
        formRegister: { ...state.formRegister, ...action.payload },
      };
    case '[Register] - sendOtp':
      return {
        ...state,
      };
    case '[Register] - FormComplete':
      return {
        steps: 0,
        formRegister: INITIAL_STATE_FORM,
      };
    case '[Register] - resetState':
      return {
        steps: state.steps + 1,
        formRegister: {
          ...(state.formRegister = INITIAL_STATE_FORM),
          type: action.payload.type,
        },
      };
    default:
      return state;
  }
};

const RegisterStateContext = createContext({} as ContextPropsState);
const RegisterDispachContext = createContext({} as ContextPropsMethods);

const RegisterProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, FORM_REGISTER_INITIAL_STATE);

  const next = (formRegister: IFormRegister) => {
    dispatch({ type: '[Register] - next', payload: formRegister });
  };

  const previous = (formRegister: IFormRegister) => {
    dispatch({ type: '[Register] - previous', payload: formRegister });
  };

  const resetState = (formRegister: IFormRegister) => {
    dispatch({ type: '[Register] - resetState', payload: formRegister });
  };

  const formComplete = () => {
    dispatch({ type: '[Register] - FormComplete' });
  };

  const sendOtp = async ({
    email,
  }: IFormRegister): Promise<{ hasError: boolean; message: string }> => {
    const body = {
      email,
    };

    try {
      const { data } = await axios.post(endPoints.otp.sendOtp, body);
      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: 'Error no encontrado, hable con el administrador',
      };
    }
  };

  const signup = async (
    formRegister: IFormRegister
  ): Promise<{ hasError: boolean; message: string }> => {
    const {
      type,
      warehouseName,
      dpi,
      name,
      surnames,
      birthDate,
      cellPhone,
      phone,
      referenceAddress,
      citiesId,
      email,
      registered,
      productsSell
    } = state.formRegister;

    const formatBirthDate = new Date(String(birthDate)).toISOString();
    const castingCititesId = Number(citiesId);

    const { password, otp } = formRegister;
    const body: IFormRegister = {
      otp,
      type,
      warehouseName,
      dpi,
      name,
      surnames,
      birthDate: formatBirthDate,
      cellPhone,
      phone,
      referenceAddress,
      citiesId: castingCititesId,
      email,
      password,
      registered,
      productsSell
    };

    try {
      const { data } = await axios.post(endPoints.signup, body);
      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: 'Error no encontrado, hable con el administrador',
      };
    }
  };
  return (
    <RegisterDispachContext.Provider
      value={{
        next,
        sendOtp,
        signup,
        previous,
        formComplete,
        resetState,
      }}
    >
      <RegisterStateContext.Provider value={{ ...state }}>
        {children}
      </RegisterStateContext.Provider>
    </RegisterDispachContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterStateContext);
export const useDispatchRegister = () => useContext(RegisterDispachContext);
export default RegisterProvider;