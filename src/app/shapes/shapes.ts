import { LAYOUT_LIMBO } from "../tetrisLayout";
import { Shape, Coordinates, Direction } from "./types";
import { Bar, rotateBar } from "./bar";
import { J, rotateJ } from "./j";
import { L } from "./l";

const shapes: Shape[] = [
  Bar,
  J,
  L,
  {
    id: "square",
    position: 1,
    coordinates: [
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ],
  },
];

export function getDeepestYCoord(shape: Shape) {
  return Math.max(...shape.coordinates.map(({ y }) => y));
}

export function getRightestCoord(shape: Shape) {
  return Math.max(...shape.coordinates.map(({ x }) => x));
}

export function getLeftistCoord(shape: Shape) {
  return Math.min(...shape.coordinates.map(({ x }) => x));
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
  return getDeepestYCoord(shape) === layoutLength - 1;
}

export function hasHitTheRightWall(coordinates: Coordinates, layoutWidth: number) {
  return coordinates.some(({ x }) => x === layoutWidth - 1);
}

export function hasHitTheLeftWall(coordinates: Coordinates) {
  return coordinates.some(({ x }) => x === 0);
}

function getNextMoveOnX(direction: Direction) {
  return direction === "right" ? 1 : -1;
}

export function translateOnX(coordinates: Coordinates, direction: Direction) {
  return coordinates.map((coords) => ({ ...coords, x: coords.x + getNextMoveOnX(direction) }));
}

export function rotateShape(shape: Shape) {
  switch (shape.id) {
    case "bar":
      return rotateBar(shape);
    case "j":
      return rotateJ(shape);
    default:
      return shape;
  }
}
