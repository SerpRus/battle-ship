import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  AppRoutes,
  routeConfig,
} from '../../../app/providers/router/routeConfig'
import cls from './Header.module.scss'

const Header: FC<{ authOnly?: boolean }> = ({ authOnly }) => (
  <nav className={cls.navbar}>
    <ul>
      {Object.keys(routeConfig).map((key: string) => {
        const {
          path,
          element, // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars
          authOnly: routeAuthOnly,
        } = routeConfig[key as AppRoutes]

        if (authOnly === routeAuthOnly) {
          /* eslint-disable  @typescript-eslint/no-non-null-assertion */
          return (
            <li key={key}>
              <Link to={path!}>{key}</Link>
            </li>
          )
          /* eslint-enable  @typescript-eslint/no-non-null-assertion */
        }
        return null
      })}
    </ul>
  </nav>
)

export default Header
