import { LAYOUT_LIMBO } from "./tetrisLayout";

export type Shape = { id: string; coordinates: Coordinates };

export type Coordinate = { x: number; y: number };

export type Coordinates = Coordinate[];

const shapes: Shape[] = [
  {
    id: "bar",
    coordinates: [
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 6, y: 2 },
    ],
  },
  {
    id: "square",
    coordinates: [
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ],
  },
  {
    id: "l",
    coordinates: [
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ],
  },
  {
    id: "j",
    coordinates: [
      { x: 5, y: 0 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 4, y: 2 },
    ],
  },
];

export function getDeepestYCoordinate(shape: Shape) {
  return Math.max(...shape.coordinates.map((coord) => coord.y));
}

export function getNextShape() {
  return shapes[Math.floor(Math.random() * shapes.length)];
}

export function incrementYCoordinates(coordinates: Coordinates) {
  return coordinates.map((coords) => ({ ...coords, y: coords.y + 1 }));
}

export function hasGotToTheTop(shape: Shape) {
  return shape.coordinates.some(({ y }) => y < LAYOUT_LIMBO);
}

export function hasGotToTheBottom(shape: Shape, layoutLength: number) {
  return getDeepestYCoordinate(shape) === layoutLength - 1;
}
