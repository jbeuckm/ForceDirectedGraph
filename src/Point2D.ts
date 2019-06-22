class Point2D {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add(point: Point2D): Point2D {
    this.x += point.x
    this.y += point.y

    return this
  }

  public scale(factor: number): Point2D {
    this.x *= factor
    this.y *= factor

    return this
  }
}

export default Point2D
