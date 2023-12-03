import type { FC } from 'react';
import { TLeaderboardItemProps } from './types';

import css from './styes.module.scss';

export const LeaderboardItem: FC<TLeaderboardItemProps> = props => {
  const { avatarUrl, nickName, score, dynamics, place } = props;
  return (
    <div className={css['leader-card']}>
      <div className={css['leader-card__img-wrapper']}>
        <img
          className={css['leader-card__img']}
          src={avatarUrl}
          alt={`${nickName}_avatar`}
        />
      </div>

      <span className={css['leader-card__name']}>{nickName}</span>
      <span className={css['leader-card__score']}>{score}</span>
      <span
        className={`${css['leader-card__dynamics']} dynamics-${dynamics}`}
      />
      <span className={css['leader-card__place']}>{place}</span>
    </div>
  );
};
