import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import Base64 from "../utils/Base64";
import * as attendanceActions from "../actions/attendance-actions";
import * as rootActions from "../actions/root-actions";
import { Alert } from "react-native";

function* dispatchReadmeSuccess(res) {
    // if (readMe.content) {
    // const content = Base64.atob(readMe.content);
    yield put(attendanceActions.setReadInfoSuccess(res));
    return res;
    // }
}

function* getStudentAttendance(token, idUser) {
    // Alert.alert('saga test: ' + idUser);
    try {
        const res = yield call(Api.getStudentAttendance, token, idUser);
        // Alert.alert('get User information-token: ' + token + '\n idUser: ' + idUser)
        // if (!readMe.message) {
        yield call(dispatchReadmeSuccess, res);
        return res;
        // } else {
        //     yield put(profileActions.setError(data));
        //     return undefined;
        // }
    } catch (error) {
        yield put(attendanceActions.setError(error));
    }
}

export function* attendanceFlow() {
    while (true) {
        const { token, idUser } = yield take(actions.ATTENDANCE_GETINFO);
        yield put(rootActions.controlProgress(true));
        yield call(getStudentAttendance, token, idUser);
        yield put(rootActions.controlProgress(false));
    }
}