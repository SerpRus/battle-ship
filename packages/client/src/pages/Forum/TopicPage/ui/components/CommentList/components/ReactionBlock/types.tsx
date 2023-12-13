import { TReactionItem } from '@pages/Forum/TopicPage/store/types';
import type { ReactionStore } from './store';

export type TReactionStore = ReactionStore;

export type TParsedReaction = {
  reaction: string;
  count: number;
  avatarList: string[];
  hasUser: boolean;
};

export type TReactionBlock = {
  reactionData: TReactionItem[];
  commentId: string;
};
