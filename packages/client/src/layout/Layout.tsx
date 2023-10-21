import React, { ReactNode } from 'react'
import Header from '../components/Header/Header'

const Layout = ({
  authOnly = false,
  children,
}: {
  authOnly?: boolean
  children: ReactNode
}) => {
  return (
    <>
      <Header authOnly={authOnly} />
      <main className="container">{children}</main>
      <footer>подвал</footer>
    </>
  )
}

export default Layout
