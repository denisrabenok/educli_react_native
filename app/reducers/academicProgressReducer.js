import * as actions from "../actions/action-types";


export default function academicProgressReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.ACADEMICPROGRESS_GETINFO_SUCCESS:
            return state.withMutations(state => state
                .set('progresses', action.progresses));
        default:
            return state
    }
}
