import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const LayoutAuth = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/profile">Профиль</Link>
          </li>
          <li>
            <Link to="/game">Игра</Link>
          </li>
          <li>
            <Link to="/leaderboard">Лидербоард</Link>
          </li>
          <li>
            <Link to="/forum">Форум</Link>
          </li>
        </ul>
      </nav>
      <main className="container">{children}</main>
      <footer>подвал</footer>
    </>
  )
}

export default LayoutAuth
