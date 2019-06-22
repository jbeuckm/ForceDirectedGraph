import Point2D from "./Point2D"

export interface Distance2D {
  magnitude: number
  direction: {
    x: number
    y: number
  }
}

export interface Address {
  row: number
  col: number
}

export interface Item {
  id: string
  position: Point2D
  [key: string]: any
}

export interface Relationship {
  [key: string]: any
}
