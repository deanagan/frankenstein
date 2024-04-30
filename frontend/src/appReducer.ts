import * as ActionTypes from "./actionTypes";
import { initialAppState } from "./appConstants";

interface SetNameType {
  type: string;
  name: string;
}

type AppReducerActionType = SetNameType;

const appReducer = (state = initialAppState, action: AppReducerActionType) => {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return { ...state, name: action.name };
  }

  return state;
};

export default appReducer;
