import { FC } from 'react';
import { TReactionOptionList } from './types';
import css from './styles.module.scss';

export const ReactionOptionList: FC<TReactionOptionList> = props => {
  const { schema, basicReactionData, addReaction } = props;

  const handleClick = (reactionName: string) => {
    addReaction({ ...basicReactionData, reactionName });
  };

  return (
    <div className={css.container}>
      {schema.map(schemaItem => (
        <button
          type="button"
          className={css.button}
          onClick={() => {
            handleClick(schemaItem.reactionName);
          }}>
          {schemaItem.reactionContent}
        </button>
      ))}
    </div>
  );
};
