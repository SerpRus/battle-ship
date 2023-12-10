import {
  getTopics,
  createTopic,
  getTopicById,
} from '../controllers/topic-controller';
import {
  getCommentsFromTopic,
  addComment,
} from '../controllers/comment-controller';
import {
  getSubscribers,
  subscribe,
} from '../controllers/subscription-controller';
import {
  addReply,
  getRepliesFromComment,
} from '../controllers/reply-controller';

export default function routes(app: any) {
  // topic
  app.get('/api/topic', async (_: any, res: any) => {
    const topics = await getTopics();
    res.json(topics);
  });

  app.get('/api/topic/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const topic = await getTopicById(id);
    res.json(topic);
  });

  app.post('/api/topic', async (req: any, res: any) => {
    await createTopic(req.body);
    res.json('OK');
  });

  // comment
  app.get('/api/comment/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const comments = await getCommentsFromTopic(id);
    res.json(comments);
  });

  app.post('/api/comment', async (req: any, res: any) => {
    await addComment(req.body);
    res.json('OK');
  });

  // subscription
  app.get('/api/subscription/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const subscribers = await getSubscribers(id);
    res.json(subscribers);
  });

  app.post('/api/subscription/:id', async (req: any, res: any) => {
    const { id } = req.params;
    await subscribe({
      ...req.body,
      topicId: id,
    });
    res.json('OK');
  });

  // reply
  app.get('/api/reply/:id', async (req: any, res: any) => {
    const { query } = req;
    const { id } = req.params;
    const replies = await getRepliesFromComment({
      commentId: query.commentId,
      topicId: id,
    });
    res.json(replies);
  });

  app.post('/api/reply/:id', async (req: any, res: any) => {
    const { id } = req.params;
    await addReply({
      ...req.body,
      topicId: id,
    });
    res.json('OK');
  });
}
