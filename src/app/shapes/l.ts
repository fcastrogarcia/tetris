import { Shape } from "./types";

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
export const L: Shape = {
  id: "l",
  position: 1,
  coordinates: [
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
  ],
};

export function rotateL(shape: Shape): Shape {
  return shape;
}
