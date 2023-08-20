"use client";

import { useEffect, useReducer } from "react";
import initialLayout from "./layout.json";
import { getNextShape, incrementYCoordinates, hasGotToTheTop, hasGotToTheBottom } from "./shapes";
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
    // goRight
    // goLeft

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

  // useEffect on keystroke that would call goRight or goLeft

  return state;
}
