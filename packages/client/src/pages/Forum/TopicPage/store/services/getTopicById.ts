import topicList from '../../mocks/topicList.json';
import { TTopicInfo } from '../types';

export const getTopicInfo = async (topicId: string) =>
  topicList.find(topic => topic.topicId === topicId) as unknown as TTopicInfo;
