import { cloneDeep } from "lodash";
import { Shape, ShapeTypes } from "./types";

/*
  POSITIONS:
  1.   
      *
      *
      * *
  2.  
      * * *
      *  
  3.  
      * * 
        * 
        * 
  4.  
        * 
    * * * 
*/
export function L(id: number): Shape {
  return {
    id,
    type: ShapeTypes.L,
    position: 1,
    coordinates: [
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ],
  };
}

export function rotateL(shape: Shape): Shape {
  const nextShape = cloneDeep(shape);

  switch (shape.position) {
    case 1: {
      nextShape.coordinates[3].y += 1;
      nextShape.coordinates[3].x -= 1;
      nextShape.coordinates[1].x += 1;
      nextShape.coordinates[1].y += 1;
      nextShape.coordinates[0].y += 2;
      nextShape.coordinates[0].x += 2;
      nextShape.position = 2;
      break;
    }
    case 2: {
      nextShape.coordinates[2].y += 1;
      nextShape.coordinates[2].x += 1;
      nextShape.coordinates[1].y += 2;
      nextShape.coordinates[0].y += 3;
      nextShape.coordinates[0].x -= 1;
      nextShape.position = 3;
      break;
    }
    case 3: {
      nextShape.coordinates[2].y += 1;
      nextShape.coordinates[2].x -= 1;
      nextShape.coordinates[1].x -= 2;
      nextShape.coordinates[0].x -= 3;
      nextShape.coordinates[0].y -= 1;
      nextShape.position = 4;
      break;
    }
    case 4: {
      nextShape.coordinates[2].y -= 1;
      nextShape.coordinates[2].x -= 1;
      nextShape.coordinates[1].y -= 2;
      nextShape.coordinates[0].y -= 3;
      nextShape.coordinates[0].x += 1;
      nextShape.position = 1;
      break;
    }
  }

  return nextShape;
}
