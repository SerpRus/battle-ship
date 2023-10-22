import { RouteProps } from 'react-router-dom'
import Login from './pages/LoginPage'
import Registration from './pages/registration'
import Profile from './pages/profile'
import Home from './pages/home'
import Game from './pages/game'
import Leaderboard from './pages/leaderboard'
import Forum from './pages/forum/index'
import Topic from './pages/forum/[id]'
import NotFound from './pages/404'

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
}

export enum AppRoutes {
  HOME = 'home',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  PROFILE = 'profile',
  GAME = 'game',
  LEADERBOARD = 'leaderboard',
  FORUM = 'forum',
  TOPIC = 'topic',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.GAME]: '/game',
  [AppRoutes.LEADERBOARD]: '/leaderboard',
  [AppRoutes.FORUM]: '/forum',
  [AppRoutes.TOPIC]: '/forum/:id',
  [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <Home />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <Login />,
    authOnly: false,
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <Registration />,
    authOnly: false,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <Profile />,
    authOnly: true,
  },
  [AppRoutes.GAME]: {
    path: RoutePath.game,
    element: <Game />,
    authOnly: true,
  },
  [AppRoutes.LEADERBOARD]: {
    path: RoutePath.leaderboard,
    element: <Leaderboard />,
    authOnly: true,
  },
  [AppRoutes.FORUM]: {
    path: RoutePath.forum,
    element: <Forum />,
    authOnly: true,
  },
  [AppRoutes.TOPIC]: {
    path: RoutePath.topic,
    element: <Topic />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFound />,
  },
}
