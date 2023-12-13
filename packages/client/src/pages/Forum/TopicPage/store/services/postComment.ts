import { UserStore } from '@pages/ProfilePage/model/store';

export const postComment = async (topicId: string, comment: string) => {
  const userStore = new UserStore();
  const user = await userStore.getUser();

  return {
    topicId,
    commentId: '12333',
    authorId: user.id.toString(),
    authorAvatarUrl: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`,
    authorFullName: user.display_name,
    comment,
    reactionData: [],
    created: new Date().toJSON(),
  };
};
