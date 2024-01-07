"use client";

import { useEffect, useReducer } from "react";
import initialLayout from "./tetrisLayout/layout.json";
import {
  getNextShape,
  incrementYCoordinates,
  hasGotToTheTop,
  hasGotToTheBottom,
  translateOnX,
  rotateShape,
} from "./shapes/shapes";
import {
  getNextLayout,
  hasExceededLayout,
  isNextLeftColumnFree,
  isNextRightColumnFree,
  isNextRowFree,
  willClashWithOtherShape,
} from "./tetrisLayout";
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

    case Actions.GoRight: {
      if (!state.currentShape) {
        return state;
      }
      if (!isNextRightColumnFree(state.layout, state.currentShape)) {
        return state;
      }

      const nextShape = {
        ...state.currentShape,
        coordinates: translateOnX(state.currentShape.coordinates, "right"),
      };

      const reversedLayout = getNextLayout(state.layout, state.currentShape, false);

      return {
        ...state,
        currentShape: nextShape,
        layout: getNextLayout(reversedLayout, nextShape, true),
      };
    }

    case Actions.GoLeft: {
      if (!state.currentShape) {
        return state;
      }
      if (!isNextLeftColumnFree(state.layout, state.currentShape)) {
        return state;
      }

      const nextShape = {
        ...state.currentShape,
        coordinates: translateOnX(state.currentShape.coordinates, "left"),
      };

      const reversedLayout = getNextLayout(state.layout, state.currentShape, false);

      return {
        ...state,
        currentShape: nextShape,
        layout: getNextLayout(reversedLayout, nextShape, true),
      };
    }

    case Actions.Rotate: {
      if (!state.currentShape) {
        return state;
      }

      const nextShape = rotateShape(state.currentShape);

      if (hasExceededLayout(nextShape, state.layout)) {
        return state;
      }
      if (willClashWithOtherShape(nextShape, state.layout)) {
        return state;
      }

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
    e.preventDefault();

    switch (e.key) {
      case "ArrowRight":
        dispatch({ type: Actions.GoRight });
        break;
      case "ArrowLeft":
        dispatch({ type: Actions.GoLeft });
        break;
      case "ArrowDown":
        dispatch({ type: Actions.GoDown });
        break;
      case "ArrowUp":
        dispatch({ type: Actions.Rotate });
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
