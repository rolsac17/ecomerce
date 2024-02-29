import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { login, selectAuth, IUser } from '@redux/states/authSlice';
import { useEffect, useState } from 'react';
import getSessionStorage from './get-session-storage';

export const GetSession = () => {
  const dispatch = useAppDispatch();
  const [session, setSession] = useState<boolean>(false);
  const { user, isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    const sessionStorage = getSessionStorage('auth');

    if (sessionStorage!) {
      setSession(true);
      dispatch(login(sessionStorage as IUser));
    } else {
      setSession(false);
    }
  }, []);

  return {
    session,
  };
};
