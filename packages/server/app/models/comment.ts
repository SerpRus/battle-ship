import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IComment {
  text: string;
  time_stamp: number;
  user_name: string;
  topic_id: number;
}

export const commentModel: ModelAttributes<Model, IComment> = {
  text: {
    type: DataType.STRING,
    allowNull: false,
  },
  time_stamp: {
    type: DataType.INTEGER,
  },
  user_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  topic_id: {
    type: DataType.INTEGER,
  },
};
