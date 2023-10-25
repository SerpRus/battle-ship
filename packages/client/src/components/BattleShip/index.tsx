import React, { useRef, useEffect, useState } from 'react';
import StartStep from '../../widgets/game/steps/start-step';
import GameStep from '../../widgets/game/steps/game-step';
import EndStep from '../../widgets/game/steps/end-step';
import { ShipsType } from '../../widgets/game/types';

type GameStepsType = {
  start: typeof StartStep;
  game: typeof GameStep;
  end: typeof EndStep;
};

export default function BattleShip() {
  const canvas = useRef<null | HTMLCanvasElement>(null);

  const [gameStep, setGameStep] = useState('start');
  const [playerShips, setPlayerShips] = useState([]);
  const [computerShips, setComputerShips] = useState([]);
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
      setPlayerShips as React.Dispatch<React.SetStateAction<ShipsType>>,
      playerShips,
      setComputerShips as React.Dispatch<React.SetStateAction<ShipsType>>,
      computerShips,
      isPlayerWin,
      setIsPlayerWin as React.Dispatch<React.SetStateAction<boolean>>
    );

    currentStep.render();

    if (currentStep.clickHandler) {
      clickRef.current = currentStep.clickHandler;
    }
  }, [gameStep, playerShips, computerShips, isPlayerWin]);

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
