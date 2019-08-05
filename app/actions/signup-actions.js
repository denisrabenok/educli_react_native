import * as actions from "../actions/action-types";
import { Alert } from "react-native";
export function signup(email, password) {
    Alert.alert('actions: ' + email + ' ' + password);
    return {
        type: actions.SIGNUP_ACTION,
        email: email,
        password: password
    }
}

export function setError(error) {
    // Alert.alert('action test: ' + error.msg)
    return {
        type: actions.SIGNUP_ERROR,
        error: error
    }
}

export function setSignupSuccess(res, email, password) {
    return {
        type: actions.SIGNUP_SUCCESS,
        res, res,
        email, email,
        password: password,
    }
}