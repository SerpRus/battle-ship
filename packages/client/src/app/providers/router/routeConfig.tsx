import { RouteProps } from 'react-router-dom';
import Topic from '../../../pages/Forum/TopicConversationPage';
import CreateTopic from '../../../pages/Forum/CreateTopicPage';
import Login from '../../../pages/LoginPage';
import RegistrationPage from '../../../pages/RegistrationPage';
import TopicList from '../../../pages/Forum/TopicListPage';
import HomePage from '../../../pages/HomePage';
import GamePage from '../../../pages/GamePage';
import NotFound from '../../../pages/404Page';
import ServerErrorPage from '../../../pages/500Page';
import Leaderboard from '../../../pages/Leaderboard';
import ProfilePage from '../../../pages/ProfilePage';

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
  CREATE_TOPIC = 'create',
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
  [AppRoutes.CREATE_TOPIC]: '/forum/create',
  [AppRoutes.TOPIC]: '/forum/:id',
  [AppRoutes.SERVER_ERROR]: '/500',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <HomePage />,
    authOnly: false,
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
    element: <TopicList />,
    authOnly: true,
    name: 'Форум',
  },
  [AppRoutes.CREATE_TOPIC]: {
    path: RoutePath.create,
    element: <CreateTopic />,
    authOnly: true,
    name: 'Cоздать новый топик',
  },
  [AppRoutes.TOPIC]: {
    path: RoutePath.topic,
    element: <Topic />,
    authOnly: true,
    name: 'Топик',
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
