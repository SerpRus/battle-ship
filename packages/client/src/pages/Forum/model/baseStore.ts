export class ForumStore {
  static port = __SERVER_PORT__ || '3001';

  static baseUrl = `http://localhost:${ForumStore.port}`;
}
