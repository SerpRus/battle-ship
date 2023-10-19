import { useRef, useEffect, useState } from 'react'

// import startScreen, {startScreenClickHandler} from '../game/screens/start-screen';
import StartStep from '../../widgets/game/steps/start-step'
import GameStep from '../../widgets/game/steps/game-step'
import EndStep from '../../widgets/game/steps/end-step'

// type ScreenRenderType = (ctx: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement) => void

type GameStepsType = {
  start: typeof StartStep
  game: typeof GameStep
  end: typeof EndStep
}

export default function Canvas() {
  const canvas = useRef<null | HTMLCanvasElement>(null)

  const [gameStep, setGameStep] = useState('start')

  const gameSteps: GameStepsType = {
    start: StartStep,
    game: GameStep,
    end: EndStep,
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
