import { useCallback } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppRouteProps, routeConfig } from './routeConfig'
import LayoutWrapper from './Layout'

export const AppRouter = () => {
  const renderWithWrapper = useCallback(
    (route: AppRouteProps) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          <LayoutWrapper authOnly={route?.authOnly}>
            {route.element}
          </LayoutWrapper>
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
