export type PositionType = {
  x: number
  y: number
}

export type SizeWithPositionType = {
  width: number
  height: number
  position: PositionType
}

export type ShipsType = {
  locations: string[]
  hits: string[]
}[]
