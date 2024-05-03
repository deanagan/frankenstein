import * as ActionTypes from "./actionTypes";
import { initialAppState } from "./appConstants";

interface AppReducerType {
  type: string;
  name: string;
  age: number;
}

const appReducer = (state = initialAppState, action: AppReducerType) => {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return { ...state, name: action.name };
  }

  return state;
};

export default appReducer;
