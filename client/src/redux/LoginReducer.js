const SET_AUTH = 'SET_AUTH'

const initialState = {
    isAuth: false,
    authData: {}
}

const LoginReducer = (state = initialState, action) => {
    switch (action) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: true,
                authData: action.payload,
            }
        default:
            return state
    }
}
export const setAuth = (payload) => {
    return {type: SET_AUTH, payload}
}
export default LoginReducer
