import * as actions from "../actions/action-types";

export function getUserInfo(token, idUser) {
    return {
        type: actions.PROFILE_GETUSERINFO,
        token: token,
        idUser: idUser
    }
}


export function setReadInfoError(error) {
    return {
        type: actions.PROFILE_GETUSERINFO_ERROR,
        error: error
    }
}

export function setReadInfoSuccess(userInfo) {
    return {
        type: actions.PROFILE_GETUSERINFO_SUCCESS,
        userInfo: userInfo
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