import * as actions from "../actions/action-types";
import { Alert } from 'react-native'

export default function signupReducer(state, action = {}) {
    switch (action.type) {
        case actions.SIGNUP_ERROR:
            // Alert.alert('error: ' + action.error);
            return state.withMutations(state => state
                .set('isSignedUp', false)
                .set('progress', false)
                .set('signupError', action.error));
            break;
        case actions.SIGNUP_SUCCESS:
            // Alert.alert('' + action.res.data[0].email + ', ' + action.nick);
            return state.withMutations(state => state
                .set('isSignedUp', true)
                .set('progress', false)
                // .set('idUser', action.res.data[0].idUser)
                .set('email', action.email)
                .set('password', action.password));
            break;
        default:
            return state
    }
}