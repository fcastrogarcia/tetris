import {
  Shape,
  getDeepestYCoord,
  hasHitTheRightWall,
  hasHitTheLeftWall,
  getRightestCoord,
  getLeftistCoord,
} from "./shapes";
import { cloneDeep } from "lodash";

export type Layout = { id: string | null; active: boolean }[][];

export const LAYOUT_LIMBO = 3;

export function getNextLayout(layout: Layout, shape: Shape, state: boolean) {
  const nextLayout = cloneDeep(layout);

  shape.coordinates.forEach((coordinate) => {
    nextLayout[coordinate.y][coordinate.x].active = state;
    nextLayout[coordinate.y][coordinate.x].id = state ? shape.id : null;
  });

  return nextLayout;
}

export function isNextRowFree(layout: Layout, shape: Shape) {
  let isFree = true;
  const deepestY = getDeepestYCoord(shape);

  shape.coordinates.forEach((coordinate) => {
    try {
      if (layout[coordinate.y + 1][coordinate.x].active && coordinate.y === deepestY) {
        isFree = false;
      }
    } catch {}
  });

  return isFree;
}

export function isNextRightColumnFree(layout: Layout, shape: Shape) {
  let isFree = true;

  if (hasHitTheRightWall(shape.coordinates, layout[0].length)) {
    isFree = false;
  } else {
    shape.coordinates.forEach(({ x, y }) => {
      if (layout[y][x + 1].active && getRightestCoord(shape) === x) {
        isFree = false;
      }
    });
  }

  return isFree;
}

export function isNextLeftColumnFree(layout: Layout, shape: Shape) {
  let isFree = true;

  if (hasHitTheLeftWall(shape.coordinates)) {
    isFree = false;
  } else {
    shape.coordinates.forEach(({ x, y }) => {
      if (layout[y][x - 1].active && getLeftistCoord(shape) === x) {
        isFree = false;
      }
    });
  }

  return isFree;
}
