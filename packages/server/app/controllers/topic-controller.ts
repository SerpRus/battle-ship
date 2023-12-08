import { Topic } from '../init';

export async function getTopics() {
  return Topic.findAll();
}

export async function createTopic(data: {
  title: string;
  description: string;
  userName: string;
}) {
  const timestamp = Math.floor(new Date().getTime() / 1000);

  return Topic.create({
    title: data.title,
    description: data.description,
    user_name: data.userName,
    time_stamp: timestamp,
  });
}
