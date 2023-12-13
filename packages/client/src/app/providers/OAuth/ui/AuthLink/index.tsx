import { FC, useEffect, useState } from 'react';
import { REDIRECT_URL } from '../../../../../constants';
import { getClientId } from '../../helpers/getClientId';
import css from './styles.module.scss';

export const AuthLink: FC = () => {
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const fetchClientId = async () => {
      const clientId = await getClientId();
      setClientId(clientId);
    };
    fetchClientId();
  }, []);
  return (
    <a
      className={css.link}
      href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${REDIRECT_URL}`}>
      Войти через Яндекс ID
    </a>
  );
};
