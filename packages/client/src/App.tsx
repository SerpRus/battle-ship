import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateTopic from './pages/Forum/CreateTopic/CreateTopic'
import { TopicList } from './pages/Forum/TopicList/TopicList'
import Topic from './pages/Forum/TopicConversation/Topic'

const App: React.FC = () => {
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
          <Route path="forum" element={<TopicList />} />
          <Route path="forum/:id" element={<Topic />} />
          <Route path="forum/create" element={<CreateTopic />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
