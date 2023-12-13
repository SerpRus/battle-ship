import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CommentItem } from './components/CommentItem';
import css from './styes.module.scss';
import { TCommentList } from './types';

export const CommentList: FC<TCommentList> = observer(({ commentList }) => (
  <section className={css.container}>
    {commentList.map(comment => (
      <CommentItem key={comment.commentId} {...comment} />
    ))}
  </section>
));
