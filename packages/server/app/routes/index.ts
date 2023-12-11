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
    try {
      const topics = await getTopics();
      res.json(topics);
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Не удалось получить информацию о топиках' });
    }
  });

  app.get('/api/topic/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const topic = await getTopicById(id);
      res.json(topic);
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Не удалось получить информацию о топике' });
    }
  });

  app.post('/api/topic', async (req: any, res: any) => {
    try {
      await createTopic(req.body);

      res.status(201).end();
    } catch (e) {
      res.status(500).json({ message: 'Не удалось создать топик' });
    }
  });

  // comment
  app.get('/api/comment/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const comments = await getCommentsFromTopic(id);
      res.json(comments);
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Не удалось получить информацию о комментарии' });
    }
  });

  app.post('/api/comment', async (req: any, res: any) => {
    try {
      await addComment(req.body);

      res.status(201).end();
    } catch (e) {
      res.status(500).json({ message: 'Не удалось добавить комментарий' });
    }
  });

  // subscription
  app.get('/api/subscription/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const subscribers = await getSubscribers(id);
      res.json(subscribers);
    } catch (e) {
      res
        .status(500)
        .json({
          message:
            'Не удалось получить информацию о подписавшихся на уведомление пользователей',
        });
    }
  });

  app.post('/api/subscription/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      await subscribe({
        ...req.body,
        topicId: id,
      });

      res.status(201).end();
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Не удалось подписаться на получение уведомлений' });
    }
  });

  // reply
  app.get('/api/reply/:id', async (req: any, res: any) => {
    try {
      const { query } = req;
      const { id } = req.params;
      const replies = await getRepliesFromComment({
        commentId: query.commentId,
        topicId: id,
      });
      res.json(replies);
    } catch (e) {
      res
        .status(500)
        .json({
          message: 'Не удалось получить данные об ответах на комментарий',
        });
    }
  });

  app.post('/api/reply/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      await addReply({
        ...req.body,
        topicId: id,
      });

      res.status(201).end();
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Не удалось отправить ответ на комментарий' });
    }
  });
}
