"use client";

import { useEffect, useReducer } from "react";
import initialLayout from "./tetrisLayout/layout.json";
import {
  incrementYCoordinates,
  hasGotToTheTop,
  hasGotToTheBottom,
  translateOnX,
  rotateShape,
  getShapes,
  getNextShape,
} from "./shapes/shapes";
import {
  deleteRowByIndex,
  getCompletedRowsIndexList,
  getNextLayout,
  hasExceededLayout,
  isNextLeftColumnFree,
  isNextRightColumnFree,
  isNextRowFree,
  willClashWithOtherShape,
} from "./tetrisLayout";
import { State, Action, Actions } from "./types";
import { eraseFirstAndAppendOne, replaceFirst } from "./utils";

const initialState: State = {
  layout: initialLayout,
  shapes: getShapes(2),
  plays: 1,
  playing: true,
  gameOver: false,
};

function reducer(state: State, action: Action) {
  const [currentShape] = state.shapes;

  switch (action.type) {
    case Actions.SetShape:
      const nextShapes = eraseFirstAndAppendOne(state.shapes, action.payload);

      return {
        ...state,
        layout: getNextLayout(state.layout, nextShapes[0], true),
        shapes: nextShapes,
        playing: true,
      };

    case Actions.GoDown: {
      if (!currentShape) {
        return state;
      }
      if (hasGotToTheBottom(currentShape, state.layout.length)) {
        return { ...state, plays: state.plays + 1 };
      }
      if (!isNextRowFree(state.layout, currentShape) && hasGotToTheTop(currentShape)) {
        return { ...state, playing: false, gameOver: true };
      }
      if (!isNextRowFree(state.layout, currentShape)) {
        return { ...state, plays: state.plays + 1 };
      }

      const nextShape = {
        ...currentShape,
        coordinates: incrementYCoordinates(currentShape.coordinates),
      };

      const reversedLayout = getNextLayout(state.layout, currentShape, false);

      return {
        ...state,
        shapes: replaceFirst(state.shapes, nextShape),
        layout: getNextLayout(reversedLayout, nextShape, true),
      };
    }

    case Actions.GoRight: {
      if (!currentShape) {
        return state;
      }
      if (!isNextRightColumnFree(state.layout, currentShape)) {
        return state;
      }

      const nextShape = {
        ...currentShape,
        coordinates: translateOnX(currentShape.coordinates, "right"),
      };

      const reversedLayout = getNextLayout(state.layout, currentShape, false);

      return {
        ...state,
        shapes: replaceFirst(state.shapes, nextShape),
        layout: getNextLayout(reversedLayout, nextShape, true),
      };
    }

    case Actions.GoLeft: {
      if (!currentShape) {
        return state;
      }
      if (!isNextLeftColumnFree(state.layout, currentShape)) {
        return state;
      }

      const nextShape = {
        ...currentShape,
        coordinates: translateOnX(currentShape.coordinates, "left"),
      };

      const reversedLayout = getNextLayout(state.layout, currentShape, false);

      return {
        ...state,
        shapes: replaceFirst(state.shapes, nextShape),
        layout: getNextLayout(reversedLayout, nextShape, true),
      };
    }

    case Actions.Rotate: {
      if (!currentShape) {
        return state;
      }

      const nextShape = rotateShape(currentShape);

      if (hasExceededLayout(nextShape, state.layout)) {
        return state;
      }
      if (willClashWithOtherShape(nextShape, state.layout)) {
        return state;
      }

      const reversedLayout = getNextLayout(state.layout, currentShape, false);

      return {
        ...state,
        shapes: replaceFirst(state.shapes, nextShape),
        layout: getNextLayout(reversedLayout, nextShape, true),
      };
    }

    case Actions.isRowComplete: {
      const rowsToErase = getCompletedRowsIndexList(state.layout);

      if (rowsToErase.length) {
        return { ...state, layout: deleteRowByIndex(state.layout, rowsToErase) };
      }

      return state;
    }

    default:
      return state;
  }
}

export function useTetris() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    dispatch({ type: Actions.isRowComplete });
  }, [state.plays]);

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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return state;
}
