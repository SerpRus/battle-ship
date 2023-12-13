import { FC } from 'react';
import { TReactionAvatar } from './types';
import css from './styles.module.scss';

export const ReactionAvatar: FC<TReactionAvatar> = ({ link }) => (
  <img className={css.image} alt="аватар" src={link} />
);
