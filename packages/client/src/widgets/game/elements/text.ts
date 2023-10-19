import addFonts from '../utils/add-fonts'
import { INC_COLOR } from '../utils/constants'

type TextType = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font?: string
) => void

const text: TextType = async function (
  ctx,
  text,
  x,
  y,
  font = '24px Segoeprint'
) {
  await addFonts()

  ctx.font = font
  ctx.fillStyle = INC_COLOR
  ctx.fillText(text, x, y)
}

export default text
