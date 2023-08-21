import { Layout } from "./tetrisLayout";
import { Shape } from "./shapes";

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
  MoveOnX = "MOVE_ON_X",
}

export type Action =
  | {
      type: Actions.SetShape;
      payload: Shape;
    }
  | {
      type: Actions.GoDown;
    }
  | {
      type: Actions.MoveOnX;
      payload: "right" | "left";
    };

export type UseTetrisProps = {};
