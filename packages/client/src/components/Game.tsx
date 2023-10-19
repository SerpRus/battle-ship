import { useRef, useEffect, useState } from 'react'

// import startScreen, {startScreenClickHandler} from '../game/screens/start-screen';
import StartScreen from '../game/screens/start-screen'
import GameScreen from '../game/screens/game-screen'
import EndScreen from '../game/screens/end-screen'

// type ScreenRenderType = (ctx: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement) => void

type GameStepsType = {
  start: typeof StartScreen
  game: typeof GameScreen
  end: typeof EndScreen
}

export default function Canvas() {
  const canvas = useRef<null | HTMLCanvasElement>(null)

  const [gameStep, setGameStep] = useState('start')

  const gameSteps: GameStepsType = {
    start: StartScreen,
    game: GameScreen,
    end: EndScreen,
  }

  let currentStep
  const clickRef = useRef<null | ((e: React.MouseEvent<HTMLElement>) => void)>(
    null
  )

  useEffect(() => {
    const canvasElement = canvas.current
    if (!canvasElement) {
      return
    }

    const ctx = canvasElement.getContext('2d')

    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

    currentStep = new gameSteps[gameStep as keyof GameStepsType](
      ctx,
      canvasElement,
      setGameStep
    )

    currentStep.render()

    clickRef.current = currentStep.clickHandler
  }, [gameStep])

  return (
    <canvas
      ref={canvas}
      width={1041}
      height={601}
      onClick={e => {
        if (clickRef.current) {
          clickRef.current(e)
        }
      }}
    />
  )
}
