import React, { ReactNode, useCallback } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Header from '../../../shared/ui/Header/Header'
import cls from './Layout.module.scss'
import { RoutePath } from './routeConfig'

const LayoutWrapper = ({
  isAuth,
  children,
}: {
  isAuth: boolean
  children: ReactNode
}) => {
  const location = useLocation()
  const returnContent = useCallback(() => {
    if (!isAuth) {
      return (
        <>
          <Navigate to={RoutePath.login} state={{ from: location }} replace />
          {children}
        </>
      )
    }

    return children
  }, [children, isAuth, location])

  return (
    <main className={cls.container}>
      <Header isAuth={isAuth} />
      {returnContent()}
    </main>
  )
}

export default LayoutWrapper
