import createGrid from '../elements/grid';
import text from '../elements/text';
import board from '../elements/board';
import {
  BOARD_SIZE,
  CELL_SIZE,
  COMPUTER_BOARD_POSITION,
  HIT_COLOR,
  PLAYER_BOARD_POSITION,
  SUCCESS_COLOR,
} from '../utils/constants';
import { BoardType, GameStepI } from '../types';
import getCurrectUsersFromUserRating from '../../../shared/utils/getCurrectUsersFromUserRating';
import { UserStore } from '../../../pages/ProfilePage/model/store';
import ships from '../elements/ships';
import renderBoardShots from '../elements/render-board-shots';
import button from '../elements/button';
import checkClickElement from '../utils/check-click-element';
import getClickPosition from '../utils/get-click-position';
import leaderboardApi from '../../../shared/axios/LeaderboardApi';
import { RATING_FIELD_NAME } from '../../../shared/constants/rating';

export default class EndStep implements GameStepI {
  ctx;

  canvas;

  setGameStep;

  setPlayerBoard;

  setComputerBoard;

  playerBoard;

  computerBoard;

  isPlayerWin;

  setIsPlayerWin;

  playAgainButton;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    setGameStep: React.Dispatch<React.SetStateAction<string>>,
    setPlayerBoard: React.Dispatch<React.SetStateAction<BoardType>>,
    playerBoard: BoardType,
    setComputerBoard: React.Dispatch<React.SetStateAction<BoardType>>,
    computerBoard: BoardType,
    isPlayerWin: boolean,
    setIsPlayerWin: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.setGameStep = setGameStep;
    this.setPlayerBoard = setPlayerBoard;
    this.playerBoard = playerBoard;
    this.setComputerBoard = setComputerBoard;
    this.computerBoard = computerBoard;
    this.isPlayerWin = isPlayerWin;
    this.setIsPlayerWin = setIsPlayerWin;

    this.playAgainButton = {
      width: 230,
      height: CELL_SIZE,
      position: {
        x: canvas.width / 2 - 120,
        y: this.canvas.height - CELL_SIZE / 2,
      },
    };
  }

  render = async () => {
    createGrid(this.ctx);

    const store = new UserStore();
    const currentUserData = await store.getUser();

    if (this.isPlayerWin) {
      const usersRating = await leaderboardApi.getAll({
        ratingFieldName: RATING_FIELD_NAME,
        cursor: 0,
        limit: 10,
      });

      const currentUserRating = usersRating.data.find(
        (item: any) =>
          (item.data.login || item.data.display_name) === currentUserData.login
      );

      const userRating = currentUserRating
        ? currentUserRating.data[RATING_FIELD_NAME]
        : 0;

      const time = new Date().getTime();
      const data = {
        data: {
          login: currentUserData.login,
          userName: currentUserData.display_name || currentUserData.login,
          battleShipRating: userRating + 10,
          time,
          position: 0,
        },
        ratingFieldName: RATING_FIELD_NAME,
      };

      const currectUsers = getCurrectUsersFromUserRating(usersRating.data);

      const currentUserRatingData = currectUsers.find(
        user => user.login === data.data.login
      );

      if (currentUserRatingData) {
        currentUserRatingData.battleShipRating = userRating + 10;
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

    const textMessage = `Игра окончена, победил ${
      this.isPlayerWin ? 'Игрок' : 'Компьютер'
    }`;
    await text(this.ctx, textMessage, this.canvas.width / 2 - 200, 50);

    await text(
      this.ctx,
      'Игрок',
      this.canvas.width / 4 - 50,
      this.canvas.height - CELL_SIZE
    );

    await text(
      this.ctx,
      'Компьютер',
      this.canvas.width / 1.5,
      this.canvas.height - CELL_SIZE
    );

    board(
      this.ctx,
      {
        x: PLAYER_BOARD_POSITION.x,
        y: PLAYER_BOARD_POSITION.y,
      },
      BOARD_SIZE,
      this.isPlayerWin ? SUCCESS_COLOR : HIT_COLOR
    );

    board(
      this.ctx,
      {
        x: COMPUTER_BOARD_POSITION.x,
        y: COMPUTER_BOARD_POSITION.y,
      },
      BOARD_SIZE,
      this.isPlayerWin ? HIT_COLOR : SUCCESS_COLOR
    );

    ships(
      this.ctx,
      {
        x: PLAYER_BOARD_POSITION.x,
        y: PLAYER_BOARD_POSITION.y,
      },
      this.playerBoard.ships
    );

    ships(
      this.ctx,
      {
        x: COMPUTER_BOARD_POSITION.x,
        y: COMPUTER_BOARD_POSITION.y,
      },
      this.computerBoard.ships
    );

    renderBoardShots(
      this.ctx,
      PLAYER_BOARD_POSITION,
      this.playerBoard.shots as string[][]
    );

    renderBoardShots(
      this.ctx,
      COMPUTER_BOARD_POSITION,
      this.computerBoard.shots as string[][]
    );

    await button(this.ctx, 'Играть ещё раз', this.playAgainButton.width, {
      x: this.playAgainButton.position.x,
      y: this.playAgainButton.position.y,
    });
  };

  clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { x, y } = getClickPosition(this.canvas, e);

    if (!this.isPlayAgainButtonClick(x, y)) {
      return;
    }

    this.setComputerBoard({
      ships: [],
      shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
      hits: 0,
    });
    this.setPlayerBoard({
      ships: [],
      shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
      hits: 0,
    });

    this.setGameStep('start');
  };

  isPlayAgainButtonClick(x: number, y: number) {
    return checkClickElement(
      {
        width: this.playAgainButton.width,
        height: CELL_SIZE,
        position: {
          x: this.playAgainButton.position.x,
          y: this.playAgainButton.position.y - CELL_SIZE,
        },
      },
      {
        x,
        y,
      }
    );
  }
}
