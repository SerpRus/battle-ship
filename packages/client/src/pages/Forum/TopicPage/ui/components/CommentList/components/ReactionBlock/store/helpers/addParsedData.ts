import type { TParsedReaction } from '../../types';
import { TAddParsedData } from './types';

export const addParsedData: TAddParsedData = (uniqueData, data, user) =>
  uniqueData.reduce((result: TParsedReaction[], reaction) => {
    const filteredData = data.filter(item => item.reactionName === reaction);
    const count = filteredData.length;
    const avatarList = filteredData.map(item => item.reactionAuthorAratarUrl);
    const hasUser = filteredData.some(
      item => item.reactionAuthorId === user.id.toString()
    );
    result.push({ reaction, count, avatarList, hasUser });
    return result;
  }, []);
