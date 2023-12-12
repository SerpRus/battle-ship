export type TTopic = {
  id: number;
  title: string;
  description: string;
  user_id: number;
  user_name: string;
  time_stamp: number;
};

export type TComment = {
  text: string;
  user_id: number;
  user_name: string;
  time_stamp: number;
  topic_id: number;
};
