import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IMessage {
  title: string;
  description: string;
  user_id: number;
  user_name: string;
  time_stamp: number;
}

export const topicModel: ModelAttributes<Model, IMessage> = {
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.STRING,
  },
  user_id: {
    type: DataType.INTEGER,
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
};
