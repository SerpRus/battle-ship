export type TTopic = {
  id: number;
  title: string;
  description: string;
  user_id: number;
  user_name: string;
  time_stamp: number;
};

export type TComment = {
  id: number;
  text: string;
  user_id: number;
  user_name: string;
  time_stamp: number;
  topic_id: number;
};

export type TReply = {
  text: string;
  user_name: string;
  time_stamp: number;
  parent_reply_id: number;
};
