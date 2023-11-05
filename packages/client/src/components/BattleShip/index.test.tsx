import renderer from 'react-test-renderer';
import React, { useRef, useEffect, useState } from 'react';
import StartStep from '../../widgets/game/steps/start-step';
import GameStep from '../../widgets/game/steps/game-step';
import EndStep from '../../widgets/game/steps/end-step';
import { ShipsType } from '../../widgets/game/types';

describe('Game', () => {
  const canvas = useRef<null | HTMLCanvasElement>(null);

  const [gameStep, setGameStep] = useState('start');
  const [playerShips, setPlayerShips] = useState([]);
  const [computerShips, setComputerShips] = useState([]);
  const [isPlayerWin, setIsPlayerWin] = useState(false);

  const clickRef = useRef<null | ((e: React.MouseEvent<HTMLElement>) => void)>(
    null
  );

  let currentStep: StartStep;

  beforeEach(() => {
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

    currentStep = new StartStep(
      ctx,
      canvasElement,
      setGameStep,
      setPlayerShips as React.Dispatch<React.SetStateAction<ShipsType>>,
      playerShips,
      setComputerShips as React.Dispatch<React.SetStateAction<ShipsType>>
    );
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
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
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('currentStep instance of StartStep', () => {
    expect(currentStep).toBeInstanceOf(StartStep);
  });

  it('currentStep instance of StartStep', () => {
    expect(currentStep).toBeInstanceOf(StartStep);
  });
});
