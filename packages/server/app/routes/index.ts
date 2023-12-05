import { getUsersByFirstName } from '../index';

// TODO: тип
export default function routes(app: any) {
  // TODO: тест
  app.get('/api/test', async (_: any, res: any) => {
    const users = await getUsersByFirstName('Alex3');
    res.json(users);
  });
}
