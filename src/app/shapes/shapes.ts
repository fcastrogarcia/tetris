import { LAYOUT_LIMBO } from "../tetrisLayout";
import { Shape, Coordinates, Direction, ShapeTypes } from "./types";
import { Bar, rotateBar } from "./bar";
import { J, rotateJ } from "./j";
import { L, rotateL } from "./l";
import { Square } from "./square";
import { S, rotateS } from "./s";
import { Z, rotateZ } from "./z";
import { times as lodashTimes } from "lodash";

const shapes: Function[] = [Bar, J, L, S, Z, Square];

let shapeCount = 0;

export function getNextShape(): Shape {
  shapeCount++;
  return shapes[Math.floor(Math.random() * shapes.length)](shapeCount);
}

export function getShapes(times: number) {
  return lodashTimes(times, getNextShape);
}

export function getDeepestYCoord(shape: Shape) {
  return Math.max(...shape.coordinates.map(({ y }) => y));
}

export function getRightestCoord(shape: Shape) {
  return Math.max(...shape.coordinates.map(({ x }) => x));
}

export function getLeftistCoord(shape: Shape) {
  return Math.min(...shape.coordinates.map(({ x }) => x));
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
  switch (shape.type) {
    case ShapeTypes.Bar:
      return rotateBar(shape);
    case ShapeTypes.J:
      return rotateJ(shape);
    case ShapeTypes.L:
      return rotateL(shape);
    case ShapeTypes.S:
      return rotateS(shape);
    case ShapeTypes.Z:
      return rotateZ(shape);
    default:
      return shape;
  }
}
