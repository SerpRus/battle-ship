import React, { useEffect, useState } from 'react'
import './app/styles/App.scss'
import { AppRouter } from './app/providers/router/AppRouter'
import { useAuth } from './shared/lib/hooks/useAuth'
import { useAuthUser } from './pages/LoginPage/model/hooks/useAuthUser'

function App() {
  const checkIsAuth = useAuthUser()
  const { auth, setIsAuth } = useAuth()

  useEffect(() => {
    const fetchServerData = async () => {
      // const url = `http://localhost:${__SERVER_PORT__}`
      // const response = await fetch(url)
      // const data = await response.json()
    }

    fetchServerData()
  }, [])

  useEffect(() => {
    checkIsAuth().then(res => {
      console.log(res, 'res')
      setIsAuth(res)
    })
  }, [checkIsAuth, setIsAuth])

  return (
    <div className="App">
      <AppRouter isAuth={auth} />
    </div>
  )
}

export default App
