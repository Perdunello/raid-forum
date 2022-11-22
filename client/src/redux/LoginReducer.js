import {logIn, signUp} from "../api/api";

const SET_AUTH = 'SET_AUTH'
const LOG_OUT = 'LOG_OUT'

const initialState = {
    isAuth: false,
    authData: {}
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: true,
                authData: action.payload,
            }
        case LOG_OUT:
            return {
                ...state,
                isAuth: false,
                authData: {}
            }
        default:
            return state
    }
}
const setAuth = (payload) => {
    return {type: SET_AUTH, payload}
}

export const logOut = () => {
    return {type: LOG_OUT}
}

export const signUpRequest = (data) => {
    return (dispatch) => {
        signUp(data).then(response => {
            if (response.status === 200) {
                dispatch(setAuth(data))
            }
        })
    }
}
export const logInRequest = (email, password) => {
    return (dispatch) => {
        logIn(email, password).then(response => {
            if (response.status === 200 && !response.data.hasOwnProperty('result')) {
                dispatch(setAuth(response.data[0]))
            }
        })
    }
}
export default LoginReducer
