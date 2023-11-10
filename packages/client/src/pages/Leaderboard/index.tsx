import type { FC } from 'react';
import { leaderboardMock } from './mocks/leaderboardMock';
import { LeaderboardItem } from './components/LeaderboardItem';
import css from './styes.module.scss';

export const Leaderboard: FC = () => (
  <div className={css.container}>
    <div className={css.wrapper}>
      <h1 className={css.header}>Лидеры</h1>
      {leaderboardMock.map((item, index) => (
        <LeaderboardItem key={item.nickName} {...item} place={index + 1} />
      ))}{' '}
    </div>
  </div>
);
