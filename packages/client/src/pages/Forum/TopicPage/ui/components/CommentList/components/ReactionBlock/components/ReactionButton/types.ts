import {
  TBasicReactionItem,
  TReactionItem,
} from '../../../../../../../../../Forum/TopicPage/store/types';
import { TReactionShemaItem } from '../../store/services/types';

export type TReactionButton = {
  schema: TReactionShemaItem[];
  count: number;
  reactionName: string;
  avatarList: string[];
  hasUser: boolean;
  addReaction: (data: TReactionItem) => Promise<void>;
  removeReaction: (data: TReactionItem) => Promise<void>;
  basicReactionData: TBasicReactionItem;
};
