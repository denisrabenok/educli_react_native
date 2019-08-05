import * as actions from "../actions/action-types";


export default function coursesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.COURSES_GETINFO_SUCCESS:
            return state.withMutations(state => state
                .set('courses', action.courses));
        default:
            return state
    }
}
