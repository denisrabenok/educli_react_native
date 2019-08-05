import * as actions from "../actions/action-types";

export function controlProgress(isShowing) {
    return {
        type: actions.PROGRESS,
        progress: isShowing
    }
}