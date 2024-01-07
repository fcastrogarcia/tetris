import { cloneDeep } from "lodash";
import { Shape, ShapeTypes } from "./types";

/*
  POSITIONS:
  1.   
        * *
      * *
  2.  
      *
      * *
        *     
*/
export function S(id: number): Shape {
  return {
    id,
    type: ShapeTypes.S,
    position: 1,
    coordinates: [
      { x: 5, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 3, y: 1 },
    ],
  };
}

export function rotateS(shape: Shape): Shape {
  const nextShape = cloneDeep(shape);

  switch (shape.position) {
    case 1: {
      nextShape.coordinates[3].y += 1;
      nextShape.coordinates[3].x += 1;
      nextShape.coordinates[1].y += 1;
      nextShape.coordinates[1].x -= 1;
      nextShape.coordinates[0].x -= 2;
      nextShape.position = 2;
      break;
    }
    case 2: {
      nextShape.coordinates[3].y -= 1;
      nextShape.coordinates[3].x -= 1;
      nextShape.coordinates[1].x += 1;
      nextShape.coordinates[1].y -= 1;
      nextShape.coordinates[0].x += 2;
      nextShape.position = 1;
      break;
    }
  }

  return nextShape;
}
