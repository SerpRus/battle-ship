import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RoutePath } from './routeConfig';
import { RootState } from '../../../store';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuth: auth } = useSelector((s: RootState) => s.user);
  const location = useLocation();

  if (!auth && typeof window !== 'undefined') {
    toast.error('Доступ запрещен');
    return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
  }

  return children;
}
