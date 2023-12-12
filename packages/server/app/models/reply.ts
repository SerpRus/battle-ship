import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IReply {
  text: string;
  user_name: string;
  time_stamp: number;
  parent_reply_id: number;
}

export const replyModel: ModelAttributes<Model, IReply> = {
  text: {
    type: DataType.STRING,
    allowNull: false,
  },
  user_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  time_stamp: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  parent_reply_id: {
    type: DataType.INTEGER,
  },
};
