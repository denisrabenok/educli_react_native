import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import Base64 from "../utils/Base64";
import * as profileActions from "../actions/profile-actions";
import * as rootActions from "../actions/root-actions";
import { Alert } from "react-native";

function* dispatchReadmeSuccess(res) {
    // if (readMe.content) {
    // const content = Base64.atob(readMe.content);
    yield put(profileActions.setReadInfoSuccess(res));
    return res;
    // }
}

function* getUserInfo(token, idUser) {
    // Alert.alert('saga test: ' + idUser);
    try {
        const res = yield call(Api.getUserInfo, token, idUser);
        // Alert.alert('get User information-token: ' + token + '\n idUser: ' + idUser)
        // if (!readMe.message) {
        yield call(dispatchReadmeSuccess, res);
        return res;
        // } else {
        //     yield put(profileActions.setError(data));
        //     return undefined;
        // }
    } catch (error) {
        yield put(profileActions.setError(error));
    }
}

export function* profileFlow() {
    while (true) {
        const { token, idUser } = yield take(actions.PROFILE_GETUSERINFO);
        yield put(rootActions.controlProgress(true));
        yield call(getUserInfo, token, idUser);
        yield put(rootActions.controlProgress(false));
    }
}