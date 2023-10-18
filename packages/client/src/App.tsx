import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Registration from './pages/registration'
import Profile from './pages/profile'
import Home from './pages/home'
import Game from './pages/game'
import Leaderboard from './pages/leaderboard'
import Forum from './pages/forum/index'
import Topic from './pages/forum/[id]'
import Layout from './layout/Layout'
import NotFound from './pages/404'

import './App.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* TODO: сделать разные обертки Layout в зависимости от авторизации */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="profile" element={<Profile />} />
            <Route path="game" element={<Game />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="forum" element={<Forum />} />
            <Route path="forum/:id" element={<Topic />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
