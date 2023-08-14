import { Shape, getDeepestYCoordinate } from "./shapes";

export type Layout = { id: string | null; active: boolean }[][];

export function getNextLayout(layout: Layout, shape: Shape, state: boolean) {
  const nextLayout = [...layout];

  shape.coordinates.forEach((coordinate) => {
    nextLayout[coordinate.y][coordinate.x].active = state;
    nextLayout[coordinate.y][coordinate.x].id = state ? shape.id : null;
  });

  return nextLayout;
}

export function isNextRowFree(layout: Layout, shape: Shape) {
  let isFree = true;
  const deepestY = getDeepestYCoordinate(shape);

  shape.coordinates.forEach((coordinate) => {
    try {
      if (layout[coordinate.y + 1][coordinate.x].active && coordinate.y === deepestY) {
        isFree = false;
      }
    } catch {}
  });

  return isFree;
}
