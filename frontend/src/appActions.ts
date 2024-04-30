import { SET_NAME } from "./actionTypes";

export function setName(name: string) {
  return { type: SET_NAME, name };
}
