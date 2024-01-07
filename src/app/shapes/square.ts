import { Shape, ShapeTypes } from "./types";

/*
  POSITIONS:
  1.   
     * *
     * *
*/
export function Square(id: number): Shape {
  return {
    id,
    type: ShapeTypes.Square,
    position: 1,
    coordinates: [
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ],
  };
}
