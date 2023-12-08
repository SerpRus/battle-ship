import { getTopics, createTopic } from '../controllers/topic-controller';

export default function routes(app: any) {
  app.get('/api/topic', async (_: any, res: any) => {
    const topics = await getTopics();
    res.json(topics);
  });

  app.post('/api/topic', async (req: any, res: any) => {
    await createTopic(req.body);
    res.json('OK');
  });
}
