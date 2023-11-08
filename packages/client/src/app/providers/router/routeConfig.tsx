import { RouteProps } from 'react-router-dom';
import Login from '../../../pages/LoginPage';
import RegistrationPage from '../../../pages/RegistrationPage';
import HomePage from '../../../pages/HomePage';
import GamePage from '../../../pages/GamePage';
import Leaderboard from '../../../pages/leaderboard';
import Forum from '../../../pages/Forum';
import Topic from '../../../pages/Forum/[id]';
import NotFound from '../../../pages/404Page';
import ServerErrorPage from '../../../pages/500Page';
import { ProfilePage } from '../../../pages/ProfilePage';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  name: string;
};

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
  SERVER_ERROR = 'server_error',
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
  [AppRoutes.SERVER_ERROR]: '/500',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <HomePage />,
    authOnly: true,
    name: 'Главная',
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <Login />,
    authOnly: false,
    name: 'Вход',
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <RegistrationPage />,
    authOnly: false,
    name: 'Регистрация',
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    authOnly: true,
    name: 'Профиль',
  },
  [AppRoutes.GAME]: {
    path: RoutePath.game,
    element: <GamePage />,
    authOnly: true,
    name: 'Игра',
  },
  [AppRoutes.LEADERBOARD]: {
    path: RoutePath.leaderboard,
    element: <Leaderboard />,
    authOnly: true,
    name: 'Лидербоард',
  },
  [AppRoutes.FORUM]: {
    path: RoutePath.forum,
    element: <Forum />,
    authOnly: true,
    name: 'Форум',
  },
  [AppRoutes.TOPIC]: {
    path: RoutePath.topic,
    element: <Topic />,
    authOnly: true,
    name: 'TOPIC',
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFound />,
    authOnly: undefined,
    name: '404 страница',
  },
  [AppRoutes.SERVER_ERROR]: {
    path: RoutePath.server_error,
    element: <ServerErrorPage />,
    authOnly: undefined,
    name: 'Ошибка сервера',
  },
};
