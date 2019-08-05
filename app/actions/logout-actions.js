import * as actions from "../actions/action-types";
import { Alert } from "react-native";

export function logout(authId, username, password) {
  return {
    type: actions.LOGOUT_ACTION,
    authId: authId,
    username: username,
    password: password
  }
}

export function setLogoutSuccess() {
  return {type: actions.LOGOUT_SUCCESS}
}

export function setError(error) {
  return {
    type: actions.LOGOUT_ERROR,
    error: error
  }
}