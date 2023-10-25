import React, {
  ReactNode,
  // useCallback
} from 'react';
import {
  // Navigate,
  useLocation,
} from 'react-router-dom';
import Header from '../../../shared/ui/Header/Header';
// import { RoutePath } from './routeConfig'

const LayoutWrapper = ({
  isAuth,
  authOnly,
  children,
}: {
  authOnly?: boolean;
  isAuth: boolean;
  children: ReactNode;
  // }) => {
}) => (
  // const location = useLocation();
  // const returnContent = useCallback(() => {
  //   // TODO: всегда на login перенаправляет
  //   if (!isAuth) {
  //     return (
  //       <>
  //         <Navigate to={RoutePath.login} state={{ from: location }} replace />
  //         {children}
  //       </>
  //     );
  //   }
  //
  //   return children;
  // }, [children, isAuth, location]);

  // return (
  <>
    {authOnly !== undefined && <Header authOnly={authOnly} isAuth={isAuth} />}
    {/* {returnContent()} */}
    {children}
  </>
);
// );
// };

export default LayoutWrapper;
