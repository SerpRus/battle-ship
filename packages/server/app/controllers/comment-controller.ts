import { Comment } from '../init';

export async function getCommentsFromTopic(id: number) {
  return Comment.findAll({ where: { topic_id: id } });
}

export async function addComment(data: {
  text: string;
  userId: number;
  userName: string;
  topicId: number;
}) {
  const timestamp = Math.floor(new Date().getTime() / 1000);

  return Comment.create({
    text: data.text,
    user_id: data.userId,
    user_name: data.userName,
    time_stamp: timestamp,
    topic_id: data.topicId,
  });
}
