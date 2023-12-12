import commentList from '../../mocks/commentList.json';

export const getCommentList = async (topicId: string) =>
  commentList.filter(comment => comment.topicId === topicId);
