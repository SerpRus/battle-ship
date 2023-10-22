import React from 'react'

export default function getClickPosition(
  canvas: HTMLCanvasElement,
  e: React.MouseEvent<HTMLElement>
) {
  const rect = canvas.getBoundingClientRect()

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}
