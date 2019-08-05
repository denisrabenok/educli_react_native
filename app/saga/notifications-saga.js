import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import Base64 from "../utils/Base64";
import * as notificationsActions from "../actions/notifications-actions";
import * as rootActions from "../actions/root-actions";
import { Alert } from "react-native";

function* dispatchReadmeSuccess(res) {
    // if (readMe.content) {
    // const content = Base64.atob(readMe.content);
    yield put(notificationsActions.setReadInfoSuccess(res));
    return res;
    // }
}

function* getNotifications(token, idUser) {
    // Alert.alert('saga test: ' + idUser);
    try {
        const res = yield call(Api.getNotifications, token, idUser);
        // Alert.alert('notifications: ' + token + '\n idUser: ' + idUser)
        // if (!readMe.message) {
        yield call(dispatchReadmeSuccess, res);
        return res;
        // } else {
        //     yield put(profileActions.setError(data));
        //     return undefined;
        // }
    } catch (error) {
        yield put(notificationsActions.setError(error));
    }
}

export function* notificationsFlow() {
    while (true) {
        const { token, idUser } = yield take(actions.NOTIFICATIONS_GETNOTIFICATIONS);
        yield put(rootActions.controlProgress(true));
        yield call(getNotifications, token, idUser);
        yield put(rootActions.controlProgress(false));
    }
}