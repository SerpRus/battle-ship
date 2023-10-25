import { useState } from 'react';

export const useAuth = () => {
  const [auth, setIsAuth] = useState<boolean>(
    Boolean(sessionStorage.getItem('user')) || false
  );

  return { auth, setIsAuth };
};
