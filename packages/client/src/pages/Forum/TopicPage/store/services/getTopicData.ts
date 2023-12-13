import { getCommentList } from './getCommentList';
import { getTopicInfo } from './getTopicById';

export const getTopicData = async (topicId: string) =>
  Promise.all([getTopicInfo(topicId), getCommentList(topicId)]);
