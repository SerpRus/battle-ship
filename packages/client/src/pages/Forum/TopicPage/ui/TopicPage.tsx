import type { FC } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import css from './TopicPage.module.scss';
import { CommentList } from './components/CommentList/CommentList';
import { TopicStore } from '../store/store';
import { CommentForm } from './components/CommentForm';
import { CommentInfo } from './components/CommentInfo';

export const Topic: FC = observer(() => {
  const { topicId } = useParams();

  const [store] = useState(() => new TopicStore(topicId ?? '0'));
  if (!topicId) {
    return null;
  }

  const { topicInfo, hasNotification, sendNotification } = store;
  const { commentList } = store;
  const { createComment } = store;

  return (
    <main className={css.container}>
      <article className={css.wrapper}>
        <CommentInfo
          topicInfo={topicInfo}
          hasNotification={hasNotification}
          sendNotification={sendNotification}
        />
        <CommentList commentList={commentList} />
        <CommentForm onSubmit={createComment} />
      </article>
    </main>
  );
});
