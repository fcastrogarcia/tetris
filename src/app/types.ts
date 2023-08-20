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
}

export type Action =
  | {
      type: Actions.SetShape;
      payload: Shape;
    }
  | {
      type: Actions.GoDown;
    };

export type UseTetrisProps = {};
