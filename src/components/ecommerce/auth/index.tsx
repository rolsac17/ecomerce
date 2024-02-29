import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import React from 'react';
import { Login } from './login';
import { ModalAuth } from './modal-auth';
import { Register } from './register';
import TabsAuth from './tabs-auth';

export const AuthComponent = () => {
  const { authenticationSteps } = useAppSelector(selectAuth);
  return (
    <ModalAuth>
      <TabsAuth />
      {authenticationSteps === 0 ? <Login /> : <Register />}
    </ModalAuth>
  );
};
