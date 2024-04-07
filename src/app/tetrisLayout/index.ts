import {
  hasHitTheRightWall,
  hasHitTheLeftWall,
  getRightestCoord,
  getLeftistCoord,
} from "../shapes/shapes";
import { cloneDeep, times as lodashTimes } from "lodash";
import { Shape } from "../shapes/types";

export const LAYOUT_LIMBO = 3;

import { Layout, Row } from "./types";

export function getNextLayout(layout: Layout, shape: Shape, state: boolean) {
  const nextLayout = cloneDeep(layout);

  shape.coordinates.forEach((coordinate) => {
    nextLayout[coordinate.y][coordinate.x].active = state;
    nextLayout[coordinate.y][coordinate.x].id = state ? shape.id : null;
    nextLayout[coordinate.y][coordinate.x].type = state ? shape.type : null;
  });

  return nextLayout;
}

export function isNextRowFree(layout: Layout, shape: Shape) {
  return !shape.coordinates.some((coordinate) => {
    return (
      layout[coordinate.y + 1][coordinate.x].active &&
      !shape.coordinates.find(({ x, y }) => coordinate.x === x && coordinate.y + 1 === y)
    );
  });
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

function hasExceededRightLimit(shape: Shape, rightLimit: number) {
  return shape.coordinates.some(({ x }) => x > rightLimit);
}

function hasExceededLeftLimit(shape: Shape) {
  return shape.coordinates.some(({ x }) => Math.sign(x) === -1);
}

export function hasExceededLayout(shape: Shape, layout: Layout): boolean {
  if (hasExceededRightLimit(shape, layout[0].length - 1)) {
    return true;
  }
  if (hasExceededLeftLimit(shape)) {
    return true;
  }
  return false;
}

export function willClashWithOtherShape(shape: Shape, layout: Layout): boolean {
  return shape.coordinates.some(({ x, y }) => {
    if (layout[y][x].active && layout[y][x].id !== shape.id) {
      return true;
    }
  });
}

export function getCompletedRowsIndexList(layout: Layout): number[] {
  return layout.reduce((indexList, row, index) => {
    if (isRowCompleted(row)) {
      indexList.push(index);
    }
    return indexList;
  }, [] as number[]);
}

export function isRowCompleted(row: Row) {
  return row.every((cell) => cell.active);
}

function getDefaultRow() {
  return [
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
    { id: null, active: false, type: null },
  ];
}

function getDefaultRows(times: number = 1) {
  return lodashTimes(times, getDefaultRow);
}

export function deleteRowByIndex(layout: Layout, indexes: number[]): Layout {
  const nextLayout = cloneDeep(layout);

  indexes
    .sort()
    .reverse()
    .forEach((index) => nextLayout.splice(index, 1));

  nextLayout.unshift(...getDefaultRows(indexes.length));

  return nextLayout;
}
