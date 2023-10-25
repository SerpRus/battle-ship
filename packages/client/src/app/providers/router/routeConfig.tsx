import { RouteProps } from 'react-router-dom';
import Topic from '../../../pages/Forum/TopicConversationPage';
import CreateTopic from '../../../pages/Forum/CreateTopicPage';
import Login from '../../../pages/LoginPage';
import RegistrationPage from '../../../pages/RegistrationPage';
import Profile from '../../../pages/profile';
import Home from '../../../pages/home';
import Game from '../../../pages/game';
import Leaderboard from '../../../pages/leaderboard';
import TopicList from '../../../pages/Forum/TopicListPage';
import NotFound from '../../../pages/404Page';
import ServerErrorPage from '../../../pages/500Page';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
};

/* eslint-disable no-unused-vars */
export enum AppRoutes {
  HOME = 'home',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  PROFILE = 'profile',
  GAME = 'game',
  LEADERBOARD = 'leaderboard',
  FORUM = 'forum',
  CREATE_TOPIC = 'create',
  TOPIC = 'topic',
  NOT_FOUND = 'not_found',
  SERVER_ERROR = 'server_error',
}
/* eslint-enable no-unused-vars */

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.GAME]: '/game',
  [AppRoutes.LEADERBOARD]: '/leaderboard',
  [AppRoutes.FORUM]: '/forum',
  [AppRoutes.CREATE_TOPIC]: '/forum/create',
  [AppRoutes.TOPIC]: '/forum/:id',
  [AppRoutes.SERVER_ERROR]: '/500',
  [AppRoutes.NOT_FOUND]: '*',
};

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
    element: <RegistrationPage />,
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
    element: <TopicList />,
    authOnly: true,
  },
  [AppRoutes.CREATE_TOPIC]: {
    path: RoutePath.create,
    element: <CreateTopic />,
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
    authOnly: undefined,
  },
  [AppRoutes.SERVER_ERROR]: {
    path: RoutePath.server_error,
    element: <ServerErrorPage />,
    authOnly: undefined,
  },
};
