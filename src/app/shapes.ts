export type Shape = Coordinate[];

export type Coordinate = { x: number; y: number };

const shapes: Shape[] = [
  [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
  ],
  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  [
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
  ],
  [
    { x: 5, y: 0 },
    { x: 5, y: 1 },
    { x: 5, y: 2 },
    { x: 4, y: 2 },
  ],
];

export function getNextShape() {
  return shapes[Math.floor(Math.random() * shapes.length)];
}

export function getDeepestYCoordinate(shape: Shape) {
  return Math.max(...shape.map((coord) => coord.y));
}
