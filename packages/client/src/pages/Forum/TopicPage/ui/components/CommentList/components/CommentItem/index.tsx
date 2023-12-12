import type { FC } from 'react';
import { TCommentItem } from '@pages/Forum/TopicPage/store/types';
import { parseReadableDate } from '@shared/utils/parseReadableDate';
import css from './styles.module.scss';
import { ReactionBlock } from '../ReactionBlock';

export const CommentItem: FC<TCommentItem> = props => {
  const { authorAvatarUrl, authorFullName, created } = props;
  const { comment, reactionData, commentId } = props;
  return (
    <div className={css.container}>
      <div className={css.info}>
        <img
          className={css.avatar}
          src={authorAvatarUrl}
          alt={`аватар комментатора под ником ${authorFullName}`}
        />
        <span className={css.author}>{authorFullName}</span>
        <span className={css.date}>{parseReadableDate(created)}</span>
      </div>
      <p className={css.comment}>{comment}</p>
      <ReactionBlock reactionData={reactionData} commentId={commentId} />
    </div>
  );
};
