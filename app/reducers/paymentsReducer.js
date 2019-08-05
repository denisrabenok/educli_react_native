import * as actions from "../actions/action-types";


export default function paymentsReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.PAYMENTS_GETINFO_SUCCESS:
            return state.withMutations(state => state
                .set('payments', action.payments));
        default:
            return state
    }
}
