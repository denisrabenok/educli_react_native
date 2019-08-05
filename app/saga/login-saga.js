import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as rootActions from "../actions/root-actions";
import { Alert } from 'react-native'
function* authorize(email, password) {
    try {

        const res = yield call(Api.login, email, password);
        // const token = "testtesttoken";
        if (res.status == 'success') {
            // Alert.alert('saga success ' + res.status + '');
            var token = res.token;
            var idUser = '' + res.data[0].idUser;
            // Alert.alert('token: ' + token);
            // Alert.alert('idUser: ' + idUser);
            yield put(loginActions.setLoginSuccess(token, idUser));
            return res;
        } else {
            // Alert.alert('saga failed ' + res.status + ' ' + password);
            yield put(loginActions.setError(res));
            return undefined;
        }
    } catch (error) {
        yield put(loginActions.setError(error));
    }
}

export function* loginFlow() {
    while (true) {

        const { email, password } = yield take(actions.LOGIN_ACTION);
        // Alert.alert('loginflow test: '+ email+ ', ' + password)
        yield put(rootActions.controlProgress(true));
        yield call(authorize, email, password);
        yield put(rootActions.controlProgress(false));
    }
}