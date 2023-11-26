import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { FC } from 'react';
import { Button } from 'antd';
import {
  AppRoutes,
  routeConfig,
  RoutePath,
} from '../../../app/providers/router/routeConfig';
import cls from './Header.module.scss';
import { useAuth } from '../../../app/providers/AuthProvider/AuthProvider';

const Header: FC = () => {
  const { isAuth, logout, isFullScreen } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogout = () => {
    logout().then(res => {
      if (res) {
        navigate(RoutePath.login, { replace: true });
      }
    });
  };

  return (
    <nav className={isFullScreen ? `${cls.navbar} hidden` : `${cls.navbar}`}>
      <ul className={cls.links}>
        {Object.keys(routeConfig).map((key: string) => {
          const {
            path,
            authOnly: routeAuthOnly,
            name,
          } = routeConfig[key as AppRoutes];

          if (
            (isAuth === routeAuthOnly && routeAuthOnly !== undefined) ||
            (typeof window === 'undefined' && routeAuthOnly === false)
          ) {
            return (
              <li key={key}>
                <Link
                  className={pathname === path ? `${cls.active}` : ''}
                  to={path as string}>
                  {name}
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
