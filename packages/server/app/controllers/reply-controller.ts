import { Reply } from '../init';

export async function getRepliesFromComment(data: {
  topicId: number;
  commentId: number;
}) {
  return Reply.findAll({
    where: { topic_id: data.topicId, comment_id: data.commentId },
  });
}

export async function addReply(data: {
  text: string;
  userName: string;
  topicId: number;
  commentId: number;
  parentReplyId: number;
}) {
  const timestamp = Math.floor(new Date().getTime() / 1000);

  return Reply.create({
    text: data.text,
    user_name: data.userName,
    time_stamp: timestamp,
    topic_id: data.topicId,
    comment_id: data.commentId,
    parent_reply_id: data.parentReplyId,
  });
}
