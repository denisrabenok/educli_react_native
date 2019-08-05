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
    yield put(profileActions.setUpdateInfoSuccess(res));
    return res;
    // }
}

function* updateUserInfo(token, idUser, userInfo) {
    // Alert.alert('saga test: ' + userInfo.email);
    try {
        const res = yield call(Api.updateUserInfo, token, idUser, userInfo);
        // Alert.alert('get User information-token: ' + token + '\n idUser: ' + idUser)
        // if (!readMe.message) {
        yield call(dispatchReadmeSuccess, userInfo);
        return res;
        // } else {
        //     yield put(profileActions.setError(data));
        //     return undefined;
        // }
    } catch (error) {
        yield put(profileActions.setError(error));
    }
}

export function* editProfileFlow() {
    while (true) {
        const { token, idUser, userInfo } = yield take(actions.PROFILE_UPDATEUSERINFO);
        yield put(rootActions.controlProgress(true));
        yield call(updateUserInfo, token, idUser, userInfo);
        yield put(rootActions.controlProgress(false));
    }
}