import { Shape } from "./types";

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
export const Z: Shape = {
  id: "z",
  position: 1,
  coordinates: [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
};

export function rotateZ(shape: Shape): Shape {
  return shape;
}
