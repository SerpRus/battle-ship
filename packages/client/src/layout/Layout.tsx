import React, { ReactNode } from 'react'
import Header from '../components/Header/Header'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

const Layout = ({
  authOnly = false,
  children,
}: {
  authOnly?: boolean
  children: ReactNode
}) => {
  return (
    <ErrorBoundary>
      <Header authOnly={authOnly} />
      <main className="container">{children}</main>
      <footer>подвал</footer>
    </ErrorBoundary>
  )
}

export default Layout
