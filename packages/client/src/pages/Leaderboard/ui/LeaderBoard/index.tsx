import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Spin } from 'antd';
import leaderBoardController from '../../../../shared/controllers/leaderBoardController';
import { TLeaderboardItemProps } from '../LeaderboardItem/types';
import { LeaderboardItem } from '../LeaderboardItem';

import css from './styes.module.scss';

export const Leaderboard: FC = () => {
  const [usersRatingData, setUsersRatingData] = useState<
    TLeaderboardItemProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const formattedData = await leaderBoardController.dataFormatting();

      setUsersRatingData(formattedData);
      setIsLoading(false);
    }

    fetchData().then();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.header}>Лидеры</h1>
        {isLoading && <Spin />}
        {!isLoading &&
          usersRatingData.map((item: TLeaderboardItemProps) => (
            <LeaderboardItem key={item.nickName} {...item} />
          ))}
      </div>
    </div>
  );
};
