"use client";

import { useEffect, useReducer } from "react";
import initialLayout from "./layout.json";
import {
  getNextShape,
  incrementYCoordinates,
  hasGotToTheTop,
  hasGotToTheBottom,
  translateOnX,
} from "./shapes";
import { getNextLayout, isNextRowFree } from "./tetrisLayout";
import { State, Action, Actions } from "./types";

const initialState: State = {
  layout: initialLayout,
  currentShape: null,
  plays: 1,
  playing: true,
  gameOver: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case Actions.SetShape:
      return {
        ...state,
        layout: getNextLayout(state.layout, action.payload, true),
        currentShape: action.payload,
        playing: true,
      };

    case Actions.GoDown: {
      if (!state.currentShape) {
        return state;
      }
      if (hasGotToTheBottom(state.currentShape, state.layout.length)) {
        return { ...state, plays: state.plays + 1 };
      }
      if (!isNextRowFree(state.layout, state.currentShape) && hasGotToTheTop(state.currentShape)) {
        return { ...state, playing: false, gameOver: true };
      }
      if (!isNextRowFree(state.layout, state.currentShape)) {
        return { ...state, plays: state.plays + 1 };
      }

      const nextShape = {
        ...state.currentShape,
        coordinates: incrementYCoordinates(state.currentShape.coordinates),
      };

      const reversedLayout = getNextLayout(state.layout, state.currentShape, false);

      return {
        ...state,
        currentShape: nextShape,
        layout: getNextLayout(reversedLayout, nextShape, true),
      };
    }

    case Actions.MoveOnX: {
      if (!state.currentShape) {
        return state;
      }

      const nextShape = {
        ...state.currentShape,
        coordinates: translateOnX(
          state.currentShape.coordinates,
          state.layout[0].length,
          action.payload
        ),
      };

      const reversedLayout = getNextLayout(state.layout, state.currentShape, false);

      return {
        ...state,
        currentShape: nextShape,
        layout: getNextLayout(reversedLayout, nextShape, true),
      };
    }

    default:
      return state;
  }
}

export function useTetris() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: Actions.SetShape, payload: getNextShape() });
  }, [state.plays]);

  useEffect(() => {
    if (state.playing) {
      const interval = setInterval(() => {
        dispatch({ type: Actions.GoDown });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [state.playing]);

  useEffect(() => {
    if (state.gameOver) {
      alert("Game is fucking over");
    }
  }, [state.gameOver]);

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowRight":
        dispatch({ type: Actions.MoveOnX, payload: "right" });
        break;
      case "ArrowLeft":
        dispatch({ type: Actions.MoveOnX, payload: "left" });
        break;
      default:
        return null;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return state;
}
