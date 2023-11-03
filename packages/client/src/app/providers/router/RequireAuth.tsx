import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RoutePath } from './routeConfig';
import { useAuth } from '../AuthProvider/AuthProvider';

export function RequireAuth({ children }: { children: JSX.Element }) {
  // todo: доделать когда будет редакс
  const { isAuth: auth } = useAuth();
  const location = useLocation();

  if (!auth) {
    toast.error('Access denied');
    return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
  }

  return children;
}
