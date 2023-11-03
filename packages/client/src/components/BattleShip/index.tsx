import React, { useRef, useEffect, useState } from 'react';
import StartStep from '../../widgets/game/steps/start-step';
import GameStep from '../../widgets/game/steps/game-step';
import EndStep from '../../widgets/game/steps/end-step';
import { BoardType } from '../../widgets/game/types';
import { BOARD_SIZE } from '../../widgets/game/utils/constants';

type GameStepsType = {
  start: typeof StartStep;
  game: typeof GameStep;
  end: typeof EndStep;
};

export default function BattleShip() {
  const canvas = useRef<null | HTMLCanvasElement>(null);

  const [gameStep, setGameStep] = useState('start');
  const [playerBoard, setPlayerBoard] = useState({
    ships: [],
    shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
    hits: 0,
  });
  const [computerBoard, setComputerBoard] = useState({
    ships: [],
    shots: [...Array(BOARD_SIZE)].map(() => Array(BOARD_SIZE)),
    hits: 0,
  });
  const [isPlayerWin, setIsPlayerWin] = useState(false);

  const clickRef = useRef<null | ((e: React.MouseEvent<HTMLElement>) => void)>(
    null
  );

  useEffect(() => {
    const gameSteps: GameStepsType = {
      start: StartStep,
      game: GameStep,
      end: EndStep,
    };

    const canvasElement = canvas.current;
    if (!canvasElement) {
      return;
    }

    const ctx = canvasElement.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.beginPath();

    const currentStep = new gameSteps[gameStep as keyof GameStepsType](
      ctx,
      canvasElement,
      setGameStep,
      setPlayerBoard as React.Dispatch<React.SetStateAction<BoardType>>,
      playerBoard,
      setComputerBoard as React.Dispatch<React.SetStateAction<BoardType>>,
      computerBoard,
      isPlayerWin,
      setIsPlayerWin as React.Dispatch<React.SetStateAction<boolean>>
    );

    currentStep.render();

    if (currentStep.clickHandler) {
      clickRef.current = currentStep.clickHandler;
    }
  }, [gameStep, playerBoard, computerBoard, isPlayerWin]);

  return (
    <canvas
      ref={canvas}
      width={1041}
      height={601}
      onClick={e => {
        if (clickRef.current) {
          clickRef.current(e);
        }
      }}
    />
  );
}
