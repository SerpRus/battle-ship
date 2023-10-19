import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        </ul>
      </nav>
      <main className="container">{children}</main>
      <footer>подвал</footer>
    </>
  )
}

export default Layout
