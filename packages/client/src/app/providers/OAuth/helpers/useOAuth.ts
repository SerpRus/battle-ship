import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../../../../store/userSlice';
import { getCodeParam } from './useCodeParam';
import { postAuth } from './postAuth';
import { AppDispath } from '../../../../store';

export const useOAuth = async () => {
  const dispatch = useDispatch<AppDispath>();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const tryOAuth = async () => {
      const code = getCodeParam(location, navigate);
      if (code) {
        const auth = await postAuth(code);
        if (!auth) {
          toast.error('Не удалось залогиниться через OAuth');
        }
      }
      await dispatch(getUser());
    };

    tryOAuth();
  }, [dispatch, location, navigate]);
};
