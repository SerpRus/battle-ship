import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import css from './styes.module.scss';
import { UserStore } from './store';
import { Avatar } from './ui/Avatar';
import { SingleChangeFieldset } from './ui/SingleChangeFieldset';
import { PasswordChangeFieldset } from './ui/PasswordChangeFieldset';
import type { TUser } from './types';

export const ProfilePage: FC = () => {
  const [user, setUser] = useState<TUser>({} as TUser);
  const [isLoading, setLoading] = useState(true);
  const store = useMemo(() => new UserStore(), []);

  const getUserCallback = useCallback(() => {
    store.getUser().then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, [store]);

  useEffect(() => {
    getUserCallback();
  }, [getUserCallback]);
  if (!user) {
    return null;
  }

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {isLoading && (
          <div className={css.loader}>
            <Spin tip="Загрузка" size="large">
              <div className={css.spinContent} />
            </Spin>
          </div>
        )}
        {!isLoading && (
          <>
            <header className={css.header}>
              <div className={css.column}>
                <Avatar url={user.avatar} handler={store.changeAvatar} />
              </div>
              <div className={css.column}>
                <h1 className={css.fullname}>
                  {user.first_name}
                  <br />
                  {user.second_name}
                </h1>
                <p className={css.nickname}>@{user.display_name}</p>
              </div>
            </header>
            <SingleChangeFieldset
              label="Никнейм"
              defaultValue={user.display_name}
              handler={store.changeNickname}
              yupSchemaItem="nickName"
            />
            <SingleChangeFieldset
              label="Имя"
              defaultValue={user.first_name}
              handler={store.changeFirstName}
              yupSchemaItem="firstName"
            />
            <SingleChangeFieldset
              label="Фамилия"
              defaultValue={user.second_name}
              handler={store.changeSecondName}
              yupSchemaItem="secondName"
            />
            <SingleChangeFieldset
              label="Почта"
              defaultValue={user.email}
              handler={store.changeEmail}
              yupSchemaItem="email"
            />
            <SingleChangeFieldset
              label="Телефон"
              defaultValue={user.phone}
              handler={store.changePhone}
              yupSchemaItem="phone"
            />
            <SingleChangeFieldset
              label="Логин"
              defaultValue={user.login}
              handler={store.changeLogin}
              yupSchemaItem="login"
            />
            <PasswordChangeFieldset handler={store.changePassword} />
          </>
        )}
      </div>
    </div>
  );
};
