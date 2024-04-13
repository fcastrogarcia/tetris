import { Layout } from "./tetrisLayout/types";
import { Shape } from "./shapes/types";

export type State = {
  layout: Layout;
  shapes: Shape[];
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
  toggleGameAction = "TOGGLE_GAME_ACTION",
  restartGame = "RESTART_GAME",
}

export type Action =
  | { type: Actions.SetShape; payload: Shape }
  | { type: Actions.GoDown }
  | { type: Actions.GoRight }
  | { type: Actions.GoLeft }
  | { type: Actions.Rotate }
  | { type: Actions.isRowComplete }
  | { type: Actions.toggleGameAction }
  | { type: Actions.restartGame };

export type UseTetrisProps = {};
