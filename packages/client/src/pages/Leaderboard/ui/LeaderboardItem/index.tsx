import type { FC } from 'react';
import { TLeaderboardItemProps } from './types';
import css from './styes.module.scss';

export const LeaderboardItem: FC<TLeaderboardItemProps> = props => {
  const { avatarUrl, nickName, score, dynamics, place } = props;
  return (
    <div className={css.container}>
      <div className={css.avatarWrapper}>
        <img
          className={css.avatarImg}
          src={avatarUrl}
          alt={`${nickName}_avatar`}
        />
      </div>

      <span className={css.nickName}>{nickName}</span>
      <span className={css.score}>{score}</span>
      <span className={`${css.dynamics} dynamics-${dynamics}`} />
      <span className={css.place}>{place}</span>
    </div>
  );
};
