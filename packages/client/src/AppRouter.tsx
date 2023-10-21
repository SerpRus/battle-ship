import { useCallback } from 'react'
import { AppRouteProps, routeConfig } from './routeConfig'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'

export const AppRouter = () => {
  const renderWithWrapper = useCallback(
    (route: AppRouteProps) => (
      <Route
        key={route.path}
        path={route.path}
        element={<Layout authOnly={route?.authOnly}>{route.element}</Layout>}
      />
    ),
    []
  )

  return (
    <Router>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Router>
  )
}
