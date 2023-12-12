import { Tooltip } from 'antd';
import { ReactComponent as AddReactionIcon } from '@shared/assets/icons/addReactionIcon.svg';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactionOptionList } from '../ReactionOptionList';
import css from './styles.module.scss';
import { TAddReactionButton } from './types';

export const AddReactionButton: FC<TAddReactionButton> = observer(
  ({ schema, basicReactionData, addReaction }) => (
    <Tooltip
      title={
        <ReactionOptionList
          addReaction={addReaction}
          schema={schema}
          basicReactionData={basicReactionData}
        />
      }>
      <AddReactionIcon className={css.addReactionIcon} />
    </Tooltip>
  )
);
