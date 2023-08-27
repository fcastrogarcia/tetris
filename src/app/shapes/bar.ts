import { cloneDeep } from "lodash";
import { Coordinates, Shape } from "./types";

export const Bar: Shape = {
  id: "bar",
  coordinates: [
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
  ],
};

function isLayedDown(coordinates: Coordinates): boolean {
  return coordinates.every(({ y }) => y === coordinates[0].y);
}

function standUp(coordinates: Coordinates): Coordinates {
  const nextCoords = cloneDeep(coordinates);
  nextCoords[0].x += 2;
  nextCoords[0].y -= 1;
  nextCoords[1].x += 1;
  nextCoords[1].y += 1;
  nextCoords[3].x -= 1;
  nextCoords[3].y -= 2;
  return nextCoords;
}

function layDown(coordinates: Coordinates): Coordinates {
  const nextCoords = cloneDeep(coordinates);
  nextCoords[0].x -= 2;
  nextCoords[0].y += 1;
  nextCoords[1].x -= 1;
  nextCoords[1].y -= 1;
  nextCoords[3].x += 1;
  nextCoords[3].y += 2;
  return nextCoords;
}

export function rotateBar(coordinates: Coordinates): Coordinates {
  return isLayedDown(coordinates) ? standUp(coordinates) : layDown(coordinates);
}
