import * as actions from "../actions/action-types";
import { Alert } from 'react-native'

export default function loginReducer(state, action = {}) {
    switch (action.type) {
        case actions.LOGIN_ERROR:
            // Alert.alert('error: ' + action.error);
            return state.withMutations(state => state
                .set('isLoggedIn', false)
                .set('progress', false)
                .set('idUser', null)
                .set('token', null)
                .set('loginError', action.error));
        case actions.LOGIN_SUCCESS:
            // Alert.alert('reducer: ' + action.token + ', ' + action.idUser);
            return state.withMutations(state => state
                .set('isLoggedIn', true)
                .set('progress', false)
                .set('token', action.token)
                .set('idUser', action.idUser));
        // .set('token', action.token.token));
        case actions.LOGOUT_SUCCESS: {
            return state.withMutations(state => state
                .set('progress', false)
                .set('isLoggedIn', false)
                .set('idUser', '')
                .set('email', '')
                .set('password', ''));
        }
        case actions.LOGOUT_ERROR: {
            return state.withMutations(state => state
                .set('progress', false)
                .set('isLoggedIn', false)
                .set('loginError', action.error));
        }
        default:
            return state
    }
}