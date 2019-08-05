import * as actions from "../actions/action-types";

export function getStudentCourses(token, idUser) {
    return {
        type: actions.COURSES_GETINFO,
        token: token,
        idUser: idUser
    }
}


export function setReadInfoError(error) {
    return {
        type: actions.COURSES_GETINFO_ERROR,
        error: error
    }
}

export function setReadInfoSuccess(info) {
    return {
        type: actions.COURSES_GETINFO_SUCCESS,
        courses: info
    }
}

