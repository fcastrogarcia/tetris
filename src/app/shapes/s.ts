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
export const S: Shape = {
  id: "s",
  position: 1,
  coordinates: [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 4, y: 1 },
    { x: 3, y: 1 },
  ],
};

export function rotateS(shape: Shape): Shape {
  return shape;
}
