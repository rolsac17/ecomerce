import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatcher, AppState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatcher>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
