import leaderboardApi from '../axios/LeaderboardApi';
import { RATING_FIELD_NAME, POINTS_FOR_VICTORY } from '../constants/rating';
import getCurrectUsers from '../utils/getCurrectUsers';
import { UserStore } from '../../pages/ProfilePage/model/store';
import usersApi from '../axios/UsersApi';
import type {
  UserRatingDataType,
  UserRatingFullDataType,
} from '../types/leaderBoardTypes';
import { BASE_URL } from '../../pages/ProfilePage/ui/Avatar/constants';
import stub from '../../../public/stubs/stub.svg';
import { UsersRatingDataType } from '../types/leaderBoardTypes';

class LeaderBoardController {
  async setPlayerRating(pointsForVictory = POINTS_FOR_VICTORY) {
    const store = new UserStore();
    const currentUserData = await store.getUser();

    const usersRating = await leaderboardApi.getAll({
      ratingFieldName: RATING_FIELD_NAME,
      cursor: 0,
      limit: 10,
    });

    const currentUserRating = usersRating.find(
      (item: UsersRatingDataType) =>
        (item.data.login || item.data.display_name) === currentUserData.login
    );

    const userRating = currentUserRating
      ? currentUserRating.data[RATING_FIELD_NAME]
      : 0;

    const time = new Date().getTime();
    const data: UserRatingFullDataType = {
      data: {
        login: currentUserData.login,
        userName: currentUserData.display_name || currentUserData.login,
        battleShipRating: userRating + pointsForVictory,
        time,
        position: 0,
      },
      ratingFieldName: RATING_FIELD_NAME,
    };

    const currectUsers = getCurrectUsers(usersRating);

    const currentUserRatingData = currectUsers.find(
      user => user.login === data.data.login
    );

    if (currentUserRatingData) {
      currentUserRatingData.battleShipRating = userRating + pointsForVictory;
    } else {
      currectUsers.push(data.data);
    }

    const sorted = currectUsers.sort(
      (a, b) => b.battleShipRating - a.battleShipRating
    );

    data.data.position = sorted.findIndex(
      item => item.login === currentUserData.login
    );

    await leaderboardApi.addUser(data);
  }

  getAvatarSrc(avatar: string) {
    return avatar ? `${BASE_URL}/${avatar}` : stub;
  }

  async dataFormatting() {
    const store = new UserStore();
    const millisecondsInDay = 1000 * 60 * 60 * 24;

    const currentUserData = await store.getUser();

    const usersRating = await leaderboardApi.getAll({
      ratingFieldName: RATING_FIELD_NAME,
      cursor: 0,
      limit: 10,
    });

    const currectUsers = getCurrectUsers(usersRating);

    // Из поиска нельзя получить данные текущего пользователя,
    // поэтому картинку текущего пользователя получаю из данных авторизованного пользователя
    if (currentUserData.avatar) {
      const currentUser = currectUsers.find(
        user => user.login === currentUserData.login
      );

      if (currentUser) {
        currentUser.avatar = currentUserData.avatar;
      }
    }

    const promises: Promise<any>[] = [];

    currectUsers.forEach(user => {
      promises.push(usersApi.search(user.login));
    });

    // Запрос на получение данных пользователей в рейтинге для получения аватарок
    const results = await Promise.all(promises);
    results.forEach((item, index) => {
      const data = item.data[0];

      if (!data) {
        return;
      }

      if (data.avatar) {
        currectUsers[index].avatar = data.avatar;
      }
    });

    return currectUsers.map((item: UserRatingDataType, index) => {
      let timePassed;
      if (item.time) {
        const currentTime = new Date().getTime();
        timePassed = currentTime - item.time;
      }

      let icon;
      if (timePassed && timePassed > millisecondsInDay * 7) {
        icon = 'same';
      } else if (index > item.position) {
        icon = 'down';
      } else {
        icon = 'up';
      }

      return {
        nickName: item.userName,
        score: item[RATING_FIELD_NAME],
        dynamics: icon,
        avatarUrl: this.getAvatarSrc(item.avatar || ''),
        place: index + 1,
      };
    });
  }
}

export default new LeaderBoardController();
