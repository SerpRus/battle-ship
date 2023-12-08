import { Comment } from '../init';

export async function getCommentsById(id: number) {
  return Comment.findOne({ where: { id } });
}
