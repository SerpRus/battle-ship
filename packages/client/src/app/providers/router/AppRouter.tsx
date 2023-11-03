import React, { Suspense, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from './routeConfig';
import LayoutWrapper from './Layout';
import { RequireAuth } from './RequireAuth';
import Header from '../../../shared/ui/Header/Header';

export const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = (
      <Suspense fallback={<div />}>
        <div className="page-wrapper">{route.element}</div>
      </Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route?.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return (
    <Router>
      <Header />
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Router>
  );
};
