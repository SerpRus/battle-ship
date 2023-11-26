import { useEffect, useState, useMemo } from 'react';
import type { FC } from 'react';
import { RATING_FIELD_NAME } from '../../../../shared/constants/rating';
import { BASE_URL } from '../../../ProfilePage/ui/Avatar/constants';
import { UserStore } from '../../../ProfilePage/model/store';
import leaderboardApi from '../../../../shared/axios/LeaderboardApi';
import { LeaderboardItem } from '../LeaderboardItem';
import stub from '../../../../../public/stubs/stub.svg';

import css from './styes.module.scss';

const getAvatarSrc = (avatar: string) =>
  avatar ? `${BASE_URL}/${avatar}` : stub;

export const Leaderboard: FC = () => {
  const store = useMemo(() => new UserStore(), []);
  const [usersRatingData, setUsersRatingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    store.getUser().then(userData => {
      const data = {
        data: {
          userName: userData.display_name || userData.login,
          battleShipRating: 180,
        },
        ratingFieldName: 'battleShipRating',
      };

      leaderboardApi.addUser(data);
    });

    leaderboardApi
      .getAll({
        ratingFieldName: RATING_FIELD_NAME,
        cursor: 0,
        limit: 10,
      })
      .then(usersRating => {
        const formattedObject = usersRating.data
          .filter((user: any) => user.data.userName)
          .map((user: any) => ({
            nickName: user.data.userName,
            score: user.data[RATING_FIELD_NAME],
            dynamics: 'up',
            avatarUrl: getAvatarSrc(user.data.avatar),
          }));

        setUsersRatingData(formattedObject);
        setIsLoading(true);
      });
  }, [store, usersRatingData]);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.header}>Лидеры</h1>
        {isLoading &&
          usersRatingData.map((item: any, index) => (
            <LeaderboardItem key={item.nickName} {...item} place={index + 1} />
          ))}{' '}
      </div>
    </div>
  );
};
