import * as actions from "../actions/action-types";

export function getStudentAttendance(token, idUser) {
    return {
        type: actions.ATTENDANCE_GETINFO,
        token: token,
        idUser: idUser
    }
}


export function setReadInfoError(error) {
    return {
        type: actions.ATTENDANCE_GETINFO_ERROR,
        error: error
    }
}

export function setReadInfoSuccess(info) {
    return {
        type: actions.ATTENDANCE_GETINFO_SUCCESS,
        timetables: info
    }
}


export function updatetUserInfo(token, idUser, userInfo) {
    return {
        type: actions.PROFILE_UPDATEUSERINFO,
        token: token,
        idUser: idUser,
        userInfo: userInfo
    }
}


export function setUpdateInfoSuccess(userInfo) {
    return {
        type: actions.PROFILE_UPDATEUSERINFO_SUCCESS,
        userInfo: userInfo
    }
}