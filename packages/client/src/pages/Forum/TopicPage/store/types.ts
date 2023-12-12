import type { TopicStore } from './store';

export type TTopicInfo = {
  topicId: string;
  title: string;
  created: string;
  description: string;
  authorId: string;
  authorAvatarUrl: string;
  authorFullName: string;
};

export type TReactionItem = {
  commentId: string;
  reactionName: string;
  reactionAuthorId: string;
  reactionAuthorFullName: string;
  reactionAuthorAratarUrl: string;
};

export type TCommentItem = {
  topicId: string;
  commentId: string;
  comment: string;
  authorId: string;
  authorAvatarUrl: string;
  authorFullName: string;
  created: string;
  reactionData: TReactionItem[];
};

export type TBasicReactionItem = Omit<TReactionItem, 'reactionName'>;
export type TTopicStore = TopicStore;
