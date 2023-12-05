import { Link, useLocation } from 'react-router-dom';
import type { FC } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userActions } from '../../../store/userSlice';
import {
  AppRoutes,
  routeConfig,
} from '../../../app/providers/router/routeConfig';
import cls from './Header.module.scss';
import { AppDispath, RootState } from '../../../store';

const Header: FC = () => {
  const dispatch = useDispatch<AppDispath>();
  const isAuth = useSelector((s: RootState) => s.user.isAuth);
  const isFullScreen = useSelector((s: RootState) => s.helpers.isFullScreen);
  const { pathname } = useLocation();

  const onLogout = () => {
    dispatch(userActions.setOnLoading());
    dispatch(userActions.clearError());
    dispatch(logout());
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
