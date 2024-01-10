import { makeAutoObservable } from 'mobx';
import type { TReactionItem } from '../../../../../../../../Forum/TopicPage/store/types';
import { TUser } from '../../../../../../../../ProfilePage/model/types';
import type { TParsedReaction } from '../types';
import { UserStore } from '../../../../../../../../ProfilePage/model/store';
import { addParsedData } from './helpers/addParsedData';
import { filterUniqueReaction } from './helpers/filterUniqueReaction';
import { filterActiveReaction } from './services/filterActiveReaction';
import { getReactionSchema } from './services/getReactionSchema';
import { TReactionShemaItem } from './services/types';
import { postAddReaction } from './services/postAddReaction';
import { deleteReaction } from './services/deleteReaction';

export class ReactionStore {
  public user = {} as TUser;

  public data: TReactionItem[];

  public parsedData: TParsedReaction[] = [];

  constructor(reactionData: TReactionItem[]) {
    makeAutoObservable(this);
    this.data = reactionData;
    this.init();
  }

  public reactionSchema: TReactionShemaItem[] = [];

  public activeReactionSchema: TReactionShemaItem[] = [];

  public parseReactionData = () => {
    this.parsedData = addParsedData(
      filterUniqueReaction(this.data),
      this.data,
      this.user
    );
  };

  public addReaction = async (data: TReactionItem) => {
    const hasSameReaction = this.data.some(
      item =>
        item.reactionAuthorId === data.reactionAuthorId &&
        item.reactionName === data.reactionName
    );
    if (hasSameReaction) {
      return;
    }

    const newData = [...this.data, data];
    this.setData(newData);
    await postAddReaction(data);
  };

  public removeReaction = async (data: TReactionItem) => {
    const filterCurrent = (item: TReactionItem) => {
      if (
        item.reactionAuthorId === data.reactionAuthorId &&
        item.reactionName === data.reactionName
      ) {
        return false;
      }
      return true;
    };
    const newData = this.data.filter(filterCurrent);
    this.setData(newData);
    await deleteReaction(data);
  };

  public setData = (data: TReactionItem[]) => {
    this.data = data;
    this.parseReactionData();
  };

  public init = async () => {
    const userStore = new UserStore();
    this.user = await userStore.getUser();
    this.reactionSchema = await getReactionSchema();
    this.activeReactionSchema = filterActiveReaction(this.reactionSchema);
    this.parseReactionData();
  };
}
