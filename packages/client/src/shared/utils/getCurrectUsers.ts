import type { UsersRatingDataType } from '../types/leaderBoardTypes';

export default function getCurrectUsers(users: UsersRatingDataType[]) {
  const uniqUsers: string[] = [];

  return (
    users
      // При добавлении пользователя в рейтинг на сервере данные записались некорректно,
      // есть 2 пользователя с одинаковым логином, а так же 2 пользователя с логином 'null'.
      .filter((user: UsersRatingDataType) => {
        const { login } = user.data;

        if (login && !uniqUsers.includes(login)) {
          uniqUsers.push(login);

          return login;
        }

        return false;
      })
      .map((user: UsersRatingDataType) => user.data)
  );
}
