const { distance1D, distance2D } = require("./distance")

describe("distance1D", () => {
  it("finds scalar distance", () => {
    expect(distance1D(1, 4, 10)).toEqual(3)
    expect(distance1D(-1, 2, 10)).toEqual(3)
    expect(distance1D(6, 10, 10)).toEqual(4)
    expect(distance1D(4, 1, 10)).toEqual(-3)
    expect(distance1D(9, 7, 10)).toEqual(-2)
  })
  it("finds scalar distance across the boundary", () => {
    expect(distance1D(1, 9, 10)).toEqual(-2)
    expect(distance1D(7, 1, 10)).toEqual(4)
    expect(distance1D(-1, -7, 10)).toEqual(4)
    expect(distance1D(-3, 1, 10)).toEqual(4)
    expect(distance1D(8, 2, 10)).toEqual(4)
  })
})

describe("distance2D", () => {
  it("finds 2D distances", () => {
    expect(distance2D({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 5, y: 10 })).toEqual(
      { magnitude: 1, direction: { x: 1, y: 0 } }
    )

    expect(distance2D({ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 10, y: 5 })).toEqual(
      { magnitude: 2, direction: { x: 0, y: 1 } }
    )

    expect(distance2D({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 3 })).toEqual({
      magnitude: Math.sqrt(2),
      direction: { x: 1 / Math.sqrt(2), y: 1 / Math.sqrt(2) },
    })

    expect(
      distance2D({ x: 0, y: 0 }, { x: 3, y: 4 }, { x: 10, y: 10 })
    ).toEqual({ magnitude: 5, direction: { x: 3 / 5, y: 4 / 5 } })
  })

  it("finds 2D distances across the boundary", () => {
    expect(distance2D({ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 5 })).toEqual({
      magnitude: 2,
      direction: { x: -1, y: 0 },
    })

    expect(
      distance2D({ x: 0, y: 0 }, { x: 9, y: 9 }, { x: 10, y: 10 })
    ).toEqual({
      magnitude: Math.sqrt(2),
      direction: { x: -1 / Math.sqrt(2), y: -1 / Math.sqrt(2) },
    })

    expect(
      distance2D({ x: 0, y: 0 }, { x: 7, y: 6 }, { x: 10, y: 10 })
    ).toEqual({
      magnitude: 5,
      direction: { x: -3 / 5, y: -4 / 5 },
    })
  })
})
