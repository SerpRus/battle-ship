import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userActions } from '../../../store/userSlice';

import {
  AppRoutes,
  routeConfig,
  RoutePath,
} from '../../../app/providers/router/routeConfig';
import cls from './Header.module.scss';

import { AppDispath, RootState } from '../../../store';

const Header: FC = () => {
  const dispatch = useDispatch<AppDispath>();
  const isAuth = useSelector((s: RootState) => s.user.isAuth);
  const isFullScreen = useSelector((s: RootState) => s.helpers.isFullScreen);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogout = () => {
    dispatch(userActions.setOnLoading());
    dispatch(userActions.clearError());
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuth && pathname !== `/${AppRoutes.REGISTRATION}`) {
      navigate(RoutePath.login, { replace: true });
    }
  }, [isAuth, navigate, pathname]);

  return (
    <nav className={isFullScreen ? `${cls.navbar} hidden` : `${cls.navbar}`}>
      <ul className={cls.links}>
        {Object.keys(routeConfig).map((key: string) => {
          const {
            path,
            authOnly: routeAuthOnly,
            name,
          } = routeConfig[key as AppRoutes];

          if (isAuth === routeAuthOnly) {
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
