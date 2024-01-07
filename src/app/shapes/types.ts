export type Shape = { id: number; type: ShapeTypes; position: number; coordinates: Coordinates };

export type Coordinate = { x: number; y: number };

export type Coordinates = Coordinate[];

export type Direction = "left" | "right";

export enum ShapeTypes {
  S = "s",
  L = "l",
  Bar = "bar",
  Square = "square",
  J = "j",
  Z = "z",
}
