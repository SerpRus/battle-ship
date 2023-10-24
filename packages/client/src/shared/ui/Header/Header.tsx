import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import {
  AppRoutes,
  routeConfig,
  RoutePath,
} from '../../../app/providers/router/routeConfig'
import cls from './Header.module.scss'
import { useLogoutUser } from '../../../pages/LoginPage/model/hooks/useAuthUser'
import { useAuth } from '../../lib/hooks/useAuth'

const Header: FC<{ authOnly?: boolean; isAuth: boolean }> = ({
  authOnly,
  isAuth,
}) => {
  const logout = useLogoutUser()
  const { setIsAuth } = useAuth()

  const onLogout = async () => {
    const isLoggedOut = await logout()
    if (isLoggedOut) {
      setIsAuth(false)
      window.location.replace(RoutePath.login)
    }
  }

  return (
    <nav className={cls.navbar}>
      <ul>
        {Object.keys(routeConfig).map((key: string) => {
          const { path, authOnly: routeAuthOnly } =
            routeConfig[key as AppRoutes]

          if (authOnly === routeAuthOnly) {
            return (
              <li key={key}>
                <Link to={path!}>{key}</Link>
              </li>
            )
          }

          return null
        })}
      </ul>
      {isAuth && <Button onClick={onLogout}>Выйти</Button>}
    </nav>
  )
}

export default Header
