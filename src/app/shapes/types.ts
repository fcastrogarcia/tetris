export type Shape = { id: string; position: number; coordinates: Coordinates };

export type Coordinate = { x: number; y: number };

export type Coordinates = Coordinate[];

export type Direction = "left" | "right";

export enum ShapeIds {
  S = "S",
  L = "L",
  Bar = "BAR",
  Square = "SQUARE",
  J = "J",
}
