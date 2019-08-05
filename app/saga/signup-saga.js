import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as signupActions from "../actions/signup-actions";
import * as rootActions from "../actions/root-actions";
import { Alert } from 'react-native'
function* signup(email, password) {
    try {

        const res = yield call(Api.signup, email, password);
        // const token = "testtesttoken";
        if (res.data.result) {
            Alert.alert('saga success ' + res.data.result);
            yield put(signupActions.setSignupSuccess(res, email, password));
            return res;
        } else {
            Alert.alert('saga failed ' + res.data.result + ' ' + res.data.error.email + ' ' + res.data.error.password);
            yield put(signupActions.setError(res));
            return undefined;
        }
    } catch (error) {
        yield put(signupActions.setError(error));
    }
}

export function* signupFlow() {
    while (true) {

        const { email, password } = yield take(actions.SIGNUP_ACTION);
        // Alert.alert('signupflow test: '+ email+ ', ' + password)
        yield put(rootActions.controlProgress(true));
        yield call(signup, email, password);
        yield put(rootActions.controlProgress(false));
    }
}