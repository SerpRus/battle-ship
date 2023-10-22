import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoutes, routeConfig } from '../../../routeConfig'
import cls from './Header.module.scss'

const Header: FC<{ authOnly?: boolean }> = ({ authOnly }) => (
  <nav className={cls.navbar}>
    <ul>
      {Object.keys(routeConfig).map((key: string) => {
        const {
          path,
          // element,
          authOnly: routeAuthOnly,
        } = routeConfig[key as AppRoutes]

        if (authOnly === routeAuthOnly) {
          return (
            <li key={key}>
              <Link to={path as string}>{key}</Link>
            </li>
          )
        }
        return null
      })}
    </ul>
  </nav>
)

export default Header
