import { makeAutoObservable } from 'mobx';
import { getTopicData } from './services/getTopicData';
import { postComment } from './services/postComment';
import type { TCommentItem, TTopicInfo } from './types';

export class TopicStore {
  public topicId: string;

  public hasNotification: boolean;

  public topicInfo = {} as TTopicInfo;

  public commentList: TCommentItem[] = [];

  constructor(topicId: string) {
    makeAutoObservable(this);
    this.topicId = topicId;
    this.hasNotification = Notification.permission === 'granted';
    this.init();
  }

  public sortComments = [...this.commentList].sort((a, b) =>
    b.created.localeCompare(a.created)
  );

  public createComment = async (comment: string) => {
    const newComment = await postComment(this.topicId, comment);
    this.commentList.push(newComment);
    const commentNotification = `${this.topicInfo.title} - ${newComment.authorFullName}: ${newComment.comment}`;
    this.sendNotification(commentNotification);
  };

  public sendNotification = (text: string) => {
    if ('Notification' in window && this.hasNotification) {
      return new Notification(text);
    }
    return undefined;
  };

  private init = async () => {
    const [topicInfo, commentList] = await getTopicData(this.topicId);
    this.topicInfo = topicInfo;
    this.commentList = commentList;
  };
}
