import * as actions from "../actions/action-types";

export function getStudentAcademicProgress(token, idUser) {
    return {
        type: actions.ACADEMICPROGRESS_GETINFO,
        token: token,
        idUser: idUser
    }
}


export function setReadInfoError(error) {
    return {
        type: actions.ACADEMICPROGRESS_GETINFO_ERROR,
        error: error
    }
}

export function setReadInfoSuccess(info) {
    return {
        type: actions.ACADEMICPROGRESS_GETINFO_SUCCESS,
        progresses: info
    }
}

