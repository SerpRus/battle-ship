import { TReactionItem } from '@pages/Forum/TopicPage/store/types';
import { TUser } from '@pages/ProfilePage/model/types';
import { TParsedReaction } from '../../types';

export type TAddParsedData = (
  uniqueData: string[],
  data: TReactionItem[],
  user: TUser
) => TParsedReaction[];
