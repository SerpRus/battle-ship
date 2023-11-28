import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { UserStore } from '../../../ProfilePage/model/store';
import usersApi from '../../../../shared/axios/UsersApi';
import { TLeaderboardItemProps } from '../LeaderboardItem/types';
import getCurrectUsersFromUserRating from '../../../../shared/utils/getCurrectUsersFromUserRating';
import { RATING_FIELD_NAME } from '../../../../shared/constants/rating';
import { BASE_URL } from '../../../ProfilePage/ui/Avatar/constants';
import leaderboardApi from '../../../../shared/axios/LeaderboardApi';
import { LeaderboardItem } from '../LeaderboardItem';
import stub from '../../../../../public/stubs/stub.svg';

import css from './styes.module.scss';

type UserRatingDataType = {
  avatar: string;
  battleShipRating: number;
  login: string;
  position: number;
  time: number;
  userName: string;
};

const getAvatarSrc = (avatar: string) =>
  avatar ? `${BASE_URL}/${avatar}` : stub;

export const Leaderboard: FC = () => {
  const [usersRatingData, setUsersRatingData] = useState<
    TLeaderboardItemProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const store = new UserStore();
    const millisecondsInDay = 1000 * 60 * 60 * 24;

    async function fetchData() {
      const currentUserData = await store.getUser();

      const usersRating = await leaderboardApi.getAll({
        ratingFieldName: RATING_FIELD_NAME,
        cursor: 0,
        limit: 10,
      });

      const currectUsers = getCurrectUsersFromUserRating(usersRating.data);

      // Из поиска нельзя получить данные текущего пользователя,
      // поэтому картинку текущего пользователя получаю из данных авторизованного пользователя
      if (currentUserData.avatar) {
        const currentUser = currectUsers.find(
          user => user.login === currentUserData.login
        );
        currentUser.avatar = currentUserData.avatar;
      }

      const promises: Promise<any>[] = [];

      currectUsers.forEach(user => {
        promises.push(usersApi.search(user.login || user.userName));
      });

      // Запрос на получение данных пользователей в рейтинге для получения аватарок
      const results = await Promise.all(promises);
      results.forEach((item, index) => {
        const data = item.data[0];

        if (!data) {
          return;
        }

        if (data.avatar) {
          currectUsers[index].avatar = data.avatar;
        }
      });

      const formattedObject = currectUsers.map(
        (item: UserRatingDataType, index) => {
          let timePassed;
          if (item.time) {
            const currentTime = new Date().getTime();
            timePassed = currentTime - item.time;
          }

          let icon;
          if (timePassed && timePassed > millisecondsInDay * 7) {
            icon = 'same';
          } else if (index > item.position) {
            icon = 'down';
          } else {
            icon = 'up';
          }

          return {
            nickName: item.userName,
            score: item[RATING_FIELD_NAME],
            dynamics: icon,
            avatarUrl: getAvatarSrc(item.avatar),
            place: index + 1,
          };
        }
      );

      setUsersRatingData(formattedObject);
      setIsLoading(true);
    }

    fetchData().then();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.header}>Лидеры</h1>
        {isLoading &&
          usersRatingData.map((item: TLeaderboardItemProps) => (
            <LeaderboardItem key={item.nickName} {...item} />
          ))}{' '}
      </div>
    </div>
  );
};
