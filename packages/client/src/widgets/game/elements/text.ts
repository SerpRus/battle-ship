import addFonts from '../utils/add-fonts'
import { INC_COLOR } from '../utils/constants'

const text = async function loadFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font = '24px Segoeprint'
) {
  await addFonts()

  ctx.font = font
  ctx.fillStyle = INC_COLOR
  ctx.fillText(text, x, y)
}

export default text
