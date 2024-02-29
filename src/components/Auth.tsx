import React from 'react';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { IUserTypes } from 'interfaces';
import { useRouter } from 'next/router';

const Auth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAppSelector(selectAuth);

  React.useEffect(() => {
    if (user.type === IUserTypes.CLIENT_USER) {
      router.replace('/');
    }
  }, []);
  return <div className="bg-gray-50">{children}</div>;
};

export default Auth;
