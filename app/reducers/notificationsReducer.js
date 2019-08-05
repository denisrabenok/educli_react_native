import * as actions from "../actions/action-types";

import { Alert } from "react-native";

export default function notificationsReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.NOTIFICATIONS_GETNOTIFICATIONS_SUCCESS:
            return state.withMutations(state => state
                .set('notes', action.notes));
        default:
            return state
    }
}