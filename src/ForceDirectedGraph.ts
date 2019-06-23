import { Item } from "./types.d"
import Point2D from "./Point2D"

abstract class ForceDirectedGraph {
  public areaSize: Point2D = null
  public placedItems: Item[] = null
  private ACCELERATION_FACTOR: number = null
  private relationshipMatrix: object[][] = [[]]

  constructor(areaSize: Point2D, ACCELERATION_FACTOR: number = 0.0004) {
    this.areaSize = areaSize
    this.ACCELERATION_FACTOR = ACCELERATION_FACTOR
  }

  abstract forceOnItemFromSourceItem(
    targetItem: Item,
    sourceItem: Item,
    areaSize: Point2D,
    relationship: object
  ): Point2D

  totalForceOnItem = (itemIndex: number): Point2D => {
    const item = this.placedItems[itemIndex]
    let aggregateForce = new Point2D(0, 0)

    this.placedItems.forEach((placedItem, placedItemIndex) => {
      if (placedItem.id === item.id) return

      const force = this.forceOnItemFromSourceItem(
        item,
        placedItem,
        this.areaSize,
        this.relationshipMatrix[placedItemIndex][itemIndex]
      )

      aggregateForce.add(force)
    })

    return aggregateForce
  }

  public getInitialPlacement = (item: Item): Point2D =>
    new Point2D(
      this.areaSize.x * Math.random(),
      this.areaSize.y * Math.random()
    )

  public initializePositions = (items: Item[]): void => {
    this.placedItems = items.map((item: Item) => {
      return {
        ...item,
        position: this.getInitialPlacement(item),
      }
    })
  }

  private moveItem = (item: Item, distance: Point2D): void => {
    item.position.add(distance)
    if (item.position.x < 0) {
      item.position.x += this.areaSize.x
    } else if (item.position.x > this.areaSize.x) {
      item.position.x -= this.areaSize.x
    }
    if (item.position.y < 0) {
      item.position.y += this.areaSize.y
    } else if (item.position.y > this.areaSize.y) {
      item.position.y -= this.areaSize.y
    }
  }

  public step = (count: number = 1): void => {
    for (let step = count; step > 0; step--) {
      for (let i = this.placedItems.length - 1; i >= 0; i--) {
        const force = this.totalForceOnItem(i)

        this.moveItem(
          this.placedItems[i],
          force.scale(this.ACCELERATION_FACTOR)
        )
      }
    }
  }

  abstract getItemsRelationship(sourceItem: Item, targetItem: Item): object

  public prepareRelationshipMatrix = (): object[][] => {
    const N = this.placedItems.length
    const relationshipMatrix = Array(N)
      .fill(0)
      .map(() => Array(N).fill(0))

    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        if (i == j) continue

        const sourceItem = this.placedItems[i]
        const targetItem = this.placedItems[j]

        const relationship = this.getItemsRelationship(sourceItem, targetItem)

        relationshipMatrix[i][j] = relationship
        relationshipMatrix[j][i] = relationship
      }
    }

    this.relationshipMatrix = relationshipMatrix
    return relationshipMatrix
  }

  public bump = (amount: number): void => {
    this.placedItems.forEach(item => {
      item.position.x += amount * (Math.random() - 0.5)
      item.position.y += amount * (Math.random() - 0.5)
    })
  }
}

export default ForceDirectedGraph
