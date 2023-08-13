import { Shape, getDeepestYCoordinate } from "./shapes";

export type Layout = boolean[][];

export function getNextLayout(layout: Layout, shape: Shape, state: boolean) {
  const nextLayout = [...layout];

  shape.forEach((coordinate) => {
    nextLayout[coordinate.y][coordinate.x] = state;
  });

  return nextLayout;
}

export function isNextRowFree(layout: Layout, shape: Shape) {
  let isFree = true;
  const deepestY = getDeepestYCoordinate(shape);

  shape.forEach((coordinate) => {
    try {
      if (layout[coordinate.y + 1][coordinate.x] && coordinate.y === deepestY) {
        isFree = false;
      }
    } catch {}
  });

  return isFree;
}
