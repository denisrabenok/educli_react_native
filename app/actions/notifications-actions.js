import * as actions from "../actions/action-types";

import { Alert } from "react-native";
export function getNotifications(token, idUser) {
    return {
        type: actions.NOTIFICATIONS_GETNOTIFICATIONS,
        token: token,
        idUser: idUser
    }
}
export function setReadInfoSuccess(res) {
    // Alert.alert('notifications actions: ' + res.data.data[0].nameAgent);
    return {
        type: actions.NOTIFICATIONS_GETNOTIFICATIONS_SUCCESS,
        notes: res.data.data
    }
}
export function setError(err) {
    return {
        type: actions.NOTIFICATIONS_GETNOTIFICATIONS_ERROR,
        error: err
    }
}