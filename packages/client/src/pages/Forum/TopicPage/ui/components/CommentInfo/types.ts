import type { TTopicInfo } from '../../../store/types';

export type TCommentInfoProps = {
  topicInfo: TTopicInfo;
  hasNotification: boolean;
  sendNotification: (text: string) => Notification | undefined;
};
