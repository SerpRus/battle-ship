import { TReactionItem } from '../../../../../../../../../Forum/TopicPage/store/types';
import { TUser } from '../../../../../../../../../ProfilePage/model/types';
import { TParsedReaction } from '../../types';

export type TAddParsedData = (
  uniqueData: string[],
  data: TReactionItem[],
  user: TUser
) => TParsedReaction[];
