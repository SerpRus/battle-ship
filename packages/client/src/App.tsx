import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import CreateTopic from './pages/Forum/CreateTopic/CreateTopic'

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
    <>
      <h1>HEADER</h1>
      <BrowserRouter>
        <Routes>
          {/*<Route path="forum" element={<TopicList />} >
                        <Route path=":id" element={<Topic />} />
                    </Route>*/}
          <Route path="forum" element={<CreateTopic />} />
          {/*<Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

/*
import React, { useEffect } from 'react'
import './App.css'
import { AppRouter } from './AppRouter'

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
      <AppRouter />
    </div>
  )
}

export default App*/
