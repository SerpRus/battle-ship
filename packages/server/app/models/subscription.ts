import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface ISubscription {
  user_id: number;
}

export const subscriptionModel: ModelAttributes<Model, ISubscription> = {
  user_id: {
    type: DataType.INTEGER,
  },
};
