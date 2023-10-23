import React, { useEffect } from 'react'
import './app/styles/App.scss'
import { AppRouter } from './app/providers/router/AppRouter'

const App: React.FC = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data) // eslint-disable-line no-console
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      <AppRouter />
    </div>
  )
}

export default App
