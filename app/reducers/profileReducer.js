import * as actions from "../actions/action-types";


export default function profileReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.PROFILE_GETUSERINFO_SUCCESS:
            return state.withMutations(state => state
                .set('name', action.userInfo.data.userProfile.name)
                .set('surname', action.userInfo.data.userProfile.surname)
                .set('birthDate', action.userInfo.data.userProfile.birthDate)
                .set('email', action.userInfo.data.email)
                .set('address', action.userInfo.data.userProfile.address)
                .set('phone', action.userInfo.data.userProfile.phone)
                .set('passport', action.userInfo.data.userProfile.passport)
                .set('mobile', action.userInfo.data.userProfile.mobile)
                .set('passportIssueDate', action.userInfo.data.userProfile.passportIssueDate)
                .set('passportExpiryDate', action.userInfo.data.userProfile.passportExpiryDate));
        case actions.PROFILE_UPDATEUSERINFO_SUCCESS:
            return state.withMutations(state => state
                .set('name', action.userInfo.firstName)
                .set('surname', action.userInfo.surName)
                .set('birthDate', action.userInfo.dateofbirth)
                .set('email', action.userInfo.email)
                .set('address', action.userInfo.address)
                .set('phone', action.userInfo.phone)
                .set('passport', action.userInfo.passportnumber)
                .set('mobile', action.userInfo.mobile)
                .set('passportIssueDate', action.userInfo.issuedate)
                .set('passportExpiryDate', action.userInfo.expirydate));
        default:
            return state
    }
}
