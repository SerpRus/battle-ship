import { TReactionItem } from '../../../../../../../../../Forum/TopicPage/store/types';

export const filterUniqueReaction = (reactionData: TReactionItem[]) =>
  Array.from(new Set(reactionData.map(item => item.reactionName)));
