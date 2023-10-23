import React, { ReactNode } from 'react'
import Header from '../../../shared/ui/Header/Header'
import cls from './Layout.module.scss'

const LayoutWrapper = ({
  authOnly = false,
  children,
}: {
  authOnly?: boolean
  children: ReactNode
}) => (
  <main className={cls.container}>
    <Header authOnly={authOnly} />
    {children}
  </main>
)

export default LayoutWrapper
