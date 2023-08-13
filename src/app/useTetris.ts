"use client";

import { useEffect, useReducer } from "react";
import initialLayout from "./layout.json";
import { getNextShape, getDeepestYCoordinate } from "./shapes";
import { getNextLayout, isNextRowFree } from "./tetrisLayout";
import { State, Action, Actions } from "./types";

const initialState: State = {
  layout: initialLayout,
  currentShape: null,
  plays: 1,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    // goRight
    // goLeft
    // goDown

    case Actions.SetShape:
      return {
        ...state,
        layout: getNextLayout(state.layout, action.payload, true),
        currentShape: action.payload,
      };

    case Actions.GoDown: {
      if (!state.currentShape) {
        return state;
      }

      if (getDeepestYCoordinate(state.currentShape) === state.layout.length - 1) {
        return { ...state, plays: state.plays + 1 };
      }

      if (!isNextRowFree(state.layout, state.currentShape)) {
        return { ...state, plays: state.plays + 1 };
      }

      const nextShape = state.currentShape.map((coord) => {
        return { ...coord, y: coord.y + 1 };
      });

      const layout = getNextLayout(state.layout, state.currentShape, false);

      return {
        ...state,
        currentShape: nextShape,
        layout: getNextLayout(layout, nextShape, true),
      };
    }

    default:
      return state;
  }
}

export function useTetris() {
  const [{ currentShape, layout, plays }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: Actions.SetShape, payload: getNextShape() });
  }, [plays]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: Actions.GoDown });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // useEffect on keystroke that would call goRight or goLeft

  return { layout, currentShape };
}
