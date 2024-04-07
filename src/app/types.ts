import { Layout } from "./tetrisLayout/types";
import { Shape } from "./shapes/types";

export type State = {
  layout: Layout;
  currentShape: Shape | null;
  plays: number;
  playing: boolean;
  gameOver: boolean;
};

export enum Actions {
  SetShape = "SET_SHAPE",
  GoDown = "GO_DOWN",
  GoRight = "GO_RIGHT",
  GoLeft = "GO_LEFT",
  Rotate = "ROTATE",
  isRowComplete = "IS_ROW_COMPLETE",
}

export type Action =
  | { type: Actions.SetShape; payload: Shape }
  | { type: Actions.GoDown }
  | { type: Actions.GoRight }
  | { type: Actions.GoLeft }
  | { type: Actions.Rotate }
  | { type: Actions.isRowComplete };

export type UseTetrisProps = {};
