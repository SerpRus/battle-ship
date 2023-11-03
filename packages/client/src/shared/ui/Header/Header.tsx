import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import {
  AppRoutes,
  routeConfig,
  RoutePath,
} from '../../../app/providers/router/routeConfig';
import cls from './Header.module.scss';
import { useAuth } from '../../../app/providers/AuthProvider/AuthProvider';

const Header: FC = () => {
  const { isAuth, logout } = useAuth();

  const onLogout = async () => {
    const isLoggedOut = await logout();
    if (isLoggedOut) {
      window.location.replace(RoutePath.login);
    }
  };

  return (
    <nav className={cls.navbar}>
      <ul className={cls.links}>
        {Object.keys(routeConfig).map((key: string) => {
          const { path, authOnly: routeAuthOnly } =
            routeConfig[key as AppRoutes];

          if (isAuth === routeAuthOnly) {
            return (
              <li key={key}>
                <Link to={path!} className={cls.link}>
                  {key}
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
      {isAuth && (
        <div className={cls.btn}>
          <Button onClick={onLogout}>Выйти</Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
