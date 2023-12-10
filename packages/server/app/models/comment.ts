import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IComment {
  text: string;
  time_stamp: number;
  user_id: number;
  user_name: string;
}

export const commentModel: ModelAttributes<Model, IComment> = {
  text: {
    type: DataType.STRING,
    allowNull: false,
  },
  time_stamp: {
    type: DataType.INTEGER,
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  user_name: {
    type: DataType.STRING,
    allowNull: false,
  },
};
