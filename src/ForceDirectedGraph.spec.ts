import ForceDirectedGraph from "./ForceDirectedGraph"
import Point2D from "./Point2D"

describe("ForceDirectedGraph", () => {
  test("prepareRelationshipMatrix", () => {
    const fdg = new ForceDirectedGraph(new Point2D(10, 10))

    fdg.getItemsRelationship = () => ({})

    fdg.placedItems = [
      {
        id: "abc",
        postId: "abc",
        tags: ["hello"],
        position: new Point2D(0, 0),
      },
      {
        id: "def",
        postId: "abc",
        tags: ["hello"],
        position: new Point2D(1, 1),
      },
    ]

    const result = fdg.prepareRelationshipMatrix()

    expect(result.length).toEqual(2)
    expect(result[0].length).toEqual(2)
    expect(result[1].length).toEqual(2)
  })
})
