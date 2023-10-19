import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoutes, routeConfig } from '../../routeConfig'

const Header: FC<{ authOnly?: boolean }> = ({ authOnly }) => {
  return (
    <nav>
      <ul>
        {Object.keys(routeConfig).map((key: string) => {
          const {
            path,
            element,
            authOnly: routeAuthOnly,
          } = routeConfig[key as AppRoutes]

          if (authOnly === routeAuthOnly) {
            return (
              <li key={key}>
                <Link to={path!}>{element}</Link>
              </li>
            )
          }
          return null
        })}
      </ul>
    </nav>
  )
}

export default Header
