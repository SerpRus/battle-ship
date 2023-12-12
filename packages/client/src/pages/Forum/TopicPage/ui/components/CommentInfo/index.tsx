import { FC, useState } from 'react';
import { parseReadableDate } from '@shared/utils/parseReadableDate';
import { ReactComponent as NotificationIcon } from '@shared/assets/icons/notification.svg';
import css from './styles.module.scss';
import { TCommentInfoProps } from './types';
import { notifyUser } from './helpers/notifyUser';

export const CommentInfo: FC<TCommentInfoProps> = props => {
  const { topicInfo, hasNotification } = props;
  const [doNotify, setDoNotify] = useState(hasNotification);

  const handleClick = () => {
    notifyUser(setDoNotify);
  };

  return (
    <section className={css.container}>
      <h2 className={css.title}>{topicInfo.title}</h2>
      <p className={css.description}>{topicInfo.description}</p>
      <div className={css.info}>
        <img
          className={css.avatar}
          src={topicInfo.authorAvatarUrl}
          alt={`аватар автора темы под ником ${topicInfo.authorFullName}`}
        />
        <div className={css.textContainer}>
          <p className={css.author}>{topicInfo.authorFullName}</p>
          <p className={css.date}>{parseReadableDate(topicInfo.created)}</p>
        </div>
        {!doNotify && (
          <button
            type="button"
            aria-label="Подписаться на уведомления по теме"
            onClick={handleClick}>
            <NotificationIcon />
          </button>
        )}
      </div>
    </section>
  );
};
