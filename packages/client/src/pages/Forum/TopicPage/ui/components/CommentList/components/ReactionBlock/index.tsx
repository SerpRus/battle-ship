import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TBasicReactionItem } from '../../../../../../../Forum/TopicPage/store/types';
import type { TReactionBlock } from './types';
import css from './styles.module.scss';
import { ReactionStore } from './store';
import { AddReactionButton } from './components/AddReactionButton';
import { ReactionButton } from './components/ReactionButton';

export const ReactionBlock: FC<TReactionBlock> = observer(props => {
  const { reactionData, commentId } = props;

  const [store] = useState(() => new ReactionStore(reactionData));

  const { reactionSchema, activeReactionSchema } = store;
  const { parsedData, user } = store;
  const { addReaction, removeReaction } = store;

  const basicReactionData: TBasicReactionItem = {
    commentId,
    reactionAuthorId: user.id?.toString(),
    reactionAuthorFullName: user.display_name,
    reactionAuthorAratarUrl: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`,
  };
  return (
    <div className={css.container}>
      {parsedData.map(item => (
        <ReactionButton
          schema={reactionSchema}
          count={item.count}
          reactionName={item.reaction}
          avatarList={item.avatarList}
          hasUser={item.hasUser}
          addReaction={addReaction}
          removeReaction={removeReaction}
          basicReactionData={basicReactionData}
        />
      ))}
      <AddReactionButton
        addReaction={addReaction}
        schema={activeReactionSchema}
        basicReactionData={basicReactionData}
      />
    </div>
  );
});
