import React from 'react';
import { useSelector } from 'react-redux';

interface User {
  [key: string]: string;
}

export const ProfilePage = () => {
  const user: User = useSelector((state: any) => state?.user.user);

  return (
    <>
      <h1>Страница профиля</h1>
      <ul>
        {Object.keys(user).map(key => (
          <li key={key}>
            <span>{key}: </span>
            <span>{user[key]}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
