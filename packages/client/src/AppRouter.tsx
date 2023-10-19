import { useCallback } from 'react'
import { AppRouteProps, routeConfig } from './routeConfig'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import LayoutAuth from './layout/LayoutAuth'

export const AppRouter = () => {
  const renderWithWrapper = useCallback(
    (route: AppRouteProps) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          route?.authOnly ? (
            <LayoutAuth>{route.element}</LayoutAuth>
          ) : (
            <Layout>{route.element}</Layout>
          )
        }
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
