import reactionShema from '../../../../../../../mocks/reactionSchema.json';
import { TReactionShemaItem } from './types';

export const getReactionSchema = async () =>
  reactionShema as unknown as TReactionShemaItem[];
