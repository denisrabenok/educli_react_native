import * as actions from "../actions/action-types";


export default function attendanceReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.ATTENDANCE_GETINFO_SUCCESS:
            return state.withMutations(state => state
                .set('timetables', action.timetables));
        default:
            return state
    }
}
