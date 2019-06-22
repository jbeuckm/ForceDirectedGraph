import { Distance2D } from "./types.d"
import Point2D from "./Point2D"

export const distance1D = (x1: number, x2: number, EXTENT: number): number => {
  if (x1 == x2) {
    return 0
  }
  const basicDistance = x2 - x1
  if (x1 < x2) {
    const mirrorDistance = x1 + EXTENT - x2

    if (basicDistance < mirrorDistance) {
      return basicDistance
    }
    return -mirrorDistance
  } else {
    const mirrorDistance = x2 + EXTENT - x1

    if (-basicDistance < mirrorDistance) {
      return basicDistance
    }
    return mirrorDistance
  }
}

export const distance2D = (
  p1: Point2D,
  p2: Point2D,
  EXTENT: Point2D
): Distance2D => {
  const dX = distance1D(p1.x, p2.x, EXTENT.x)
  const dY = distance1D(p1.y, p2.y, EXTENT.y)
  const magnitude = Math.sqrt(dX * dX + dY * dY)

  return {
    magnitude,
    direction: { x: dX / magnitude, y: dY / magnitude },
  }
}
