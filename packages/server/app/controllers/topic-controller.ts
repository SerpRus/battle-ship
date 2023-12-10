import { Topic } from '../init';

export async function getTopics() {
  return Topic.findAll();
}

export async function getTopicById(id: number) {
  return Topic.findOne({ where: { id } });
}

export async function createTopic(data: {
  title: string;
  description: string;
  userId: number;
  userName: string;
}) {
  const timestamp = Math.floor(new Date().getTime() / 1000);

  return Topic.create({
    title: data.title,
    description: data.description,
    user_id: data.userId,
    user_name: data.userName,
    time_stamp: timestamp,
  });
}
