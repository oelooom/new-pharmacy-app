import requestActionTypes from './request.types';
import { checkRequest, removeRequest } from './request.util';

const INITIAL_STATE = {
    request: [],
    selectedRequest: null
}

const requestReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case requestActionTypes.ADD_REQUEST:
            return {
                ...state,
                request: checkRequest(state.request, action.payload)
            }
        case requestActionTypes.REMOVE_REQUEST:
            return {
                ...state,
                request: removeRequest(state.request, action.payload)
            }
        case requestActionTypes.SELECT_REQUEST:
            return {
                ...state,
                selectedRequest: action.payload
            }

        default:
            return state;
    }
}

export default requestReducer;