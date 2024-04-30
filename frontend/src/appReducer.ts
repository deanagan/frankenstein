import * as ActionTypes from "./actionTypes";
import { initialAppState } from "./appConstants";

const appReducer = (state = initialAppState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return { ...state, name: action.name };
  }

  return state;
};

export default appReducer;
