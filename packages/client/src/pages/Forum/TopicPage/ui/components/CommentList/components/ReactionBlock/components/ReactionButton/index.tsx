import { FC } from 'react';
import { Tooltip } from 'antd';
import { TReactionItem } from '@pages/Forum/TopicPage/store/types';
import { observer } from 'mobx-react-lite';
import { TReactionButton } from './types';
import css from './styles.module.scss';
import { ReactionAvatar } from '../AvatarList';

export const ReactionButton: FC<TReactionButton> = observer(props => {
  const { schema, reactionName, count, avatarList, hasUser } = props;
  const { addReaction, removeReaction, basicReactionData } = props;
  const reaction = schema.find(item => item.reactionName === reactionName);
  const hasUserClass = hasUser ? css.hasUser : '';

  const handleClick = () => {
    const data: TReactionItem = {
      ...basicReactionData,
      reactionName,
    };

    if (!hasUser) {
      addReaction(data);
    } else {
      removeReaction(data);
    }
  };

  return (
    <button
      type="button"
      className={[css.container, hasUserClass].join(' ')}
      onClick={handleClick}>
      <Tooltip
        title={avatarList.map(link => (
          <ReactionAvatar key={link} link={link} />
        ))}>
        <div className={css.wrapper}>
          <span className={css.emoji}>{reaction?.reactionContent}</span>
          <span className={css.count}>{count}</span>
        </div>
      </Tooltip>
    </button>
  );
});
