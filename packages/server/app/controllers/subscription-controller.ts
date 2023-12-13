import { Subscription } from '../init';

export async function getSubscribers(id: number) {
  return Subscription.findAll({ where: { topic_id: id } });
}

export async function subscribe(data: { userId: number; topicId: number }) {
  return Subscription.create({
    user_id: data.userId,
    topic_id: data.topicId,
  });
}
