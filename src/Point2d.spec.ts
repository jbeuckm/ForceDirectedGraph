import Point2D from "./Point2D"

describe("Point2D", () => {
  test("constructor", () => {
    const p = new Point2D(1, 2)

    expect(p.x).toEqual(1)
    expect(p.y).toEqual(2)
  })

  test("add", () => {
    const p = new Point2D(1, 2)

    p.add(new Point2D(4, 5))

    expect(p.x).toEqual(5)
    expect(p.y).toEqual(7)
  })

  test("scale", () => {
    const p = new Point2D(1, 2)

    p.scale(5)

    expect(p.x).toEqual(5)
    expect(p.y).toEqual(10)
  })
})
