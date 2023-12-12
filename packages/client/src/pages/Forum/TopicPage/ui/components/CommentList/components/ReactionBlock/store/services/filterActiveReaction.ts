import { TReactionShemaItem } from './types';

export const filterActiveReaction = (schema: TReactionShemaItem[]) =>
  schema.filter(item => item.isActive === true);
