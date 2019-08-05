import * as actions from "../actions/action-types";

export function getPayments(token, idUser) {
    return {
        type: actions.PAYMENTS_GETINFO,
        token: token,
        idUser: idUser
    }
}


export function setReadInfoError(error) {
    return {
        type: actions.PAYMENTS_GETINFO_ERROR,
        error: error
    }
}

export function setReadInfoSuccess(info) {
    return {
        type: actions.PAYMENTS_GETINFO_SUCCESS,
        payments: info
    }
}