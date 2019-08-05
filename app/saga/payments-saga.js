import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import Base64 from "../utils/Base64";
import * as paymentsAction from "../actions/payments-actions";
import * as rootActions from "../actions/root-actions";
import { Alert } from "react-native";

function* dispatchReadmeSuccess(res) {
    // if (readMe.content) {
    // const content = Base64.atob(readMe.content);
    yield put(paymentsAction.setReadInfoSuccess(res));
    return res;
    // }
}

function* getPayments(token, idUser) {
    // Alert.alert('saga test: ' + idUser);
    try {
        const res = yield call(Api.getPayments, token, idUser);
        // Alert.alert('get User information-token: ' + token + '\n idUser: ' + idUser)
        // if (!readMe.message) {
        // console.log(res)
        yield call(dispatchReadmeSuccess, res);
        return res;
        // } else {
        //     yield put(profileActions.setError(data));
        //     return undefined;
        // }
    } catch (error) {
        yield put(paymentsAction.setError(error));
    }
}

export function* paymentsFlow() {
    while (true) {
        const { token, idUser } = yield take(actions.PAYMENTS_GETINFO);
        yield put(rootActions.controlProgress(true));
        yield call(getPayments, token, idUser);
        yield put(rootActions.controlProgress(false));
    }
}