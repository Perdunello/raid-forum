import {logIn, signUp} from "../api/api";
import {deleteCookie, setCookie} from "../api/cookies";

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
            deleteCookie('id')
            deleteCookie('name')
            deleteCookie('email')
            deleteCookie('password')
            return {
                ...state,
                isAuth: false,
                authData: {}
            }
        default:
            return state
    }
}
export const setAuth = (payload) => {
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
                setCookie('id', data.id, {
                    expires: new Date(Date.now() + 86400e3)
                })
                setCookie('name', data.name, {
                    expires: new Date(Date.now() + 86400e3)
                })
                setCookie('email', data.email, {
                    expires: new Date(Date.now() + 86400e3)
                })
                setCookie('password', data.password, {
                    expires: new Date(Date.now() + 86400e3)
                })
            }
        })
    }
}
export const logInRequest = (email, password) => {
    return (dispatch) => {
        logIn(email, password).then(response => {
            if (response.status === 200 && !response.data.hasOwnProperty('result')) {
                dispatch(setAuth(response.data[0]))
                setCookie('id', response.data[0].id, {
                    expires: new Date(Date.now() + 86400e3)
                })
                setCookie('name', response.data[0].name, {
                    expires: new Date(Date.now() + 86400e3)
                })
                setCookie('email', email, {
                    expires: new Date(Date.now() + 86400e3)
                })
                setCookie('password', password, {
                    expires: new Date(Date.now() + 86400e3)
                })
            }
        })
    }
}

export default LoginReducer
