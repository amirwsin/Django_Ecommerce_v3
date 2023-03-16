import {
    LOGIN_PROGRESS,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from '../types/authTypes'

const initialState = {
    token: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null,
    isAuthenticated: false,
    isLoading: false,
    user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
}
export const authReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case LOGIN_PROGRESS:
            return {
                ...state, isLoading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: payload,
                isAuthenticated: true,
                token: localStorage.getItem("access_token")
            }
        case LOGIN_FAIL:
            return {
                ...state, isLoading: false, user: null,
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}