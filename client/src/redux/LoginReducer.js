import {getAvatar, logIn, sendAvatarUser, signUp} from "../api/api";
import {deleteCookie, setCookie} from "../api/cookies";

const SET_AUTH = 'SET_AUTH'
const LOG_OUT = 'LOG_OUT'
const SET_AVATAR = 'SET_AVATAR'

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
        case SET_AVATAR:
            return {
                ...state,
                authData: {...state.authData, avatar: action.payload}
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

const setAvatar = (payload) => {
    return {type: SET_AVATAR, payload}
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
                dispatch(setAuth(response.data))
                setCookie('id', response.data.id, {
                    expires: new Date(Date.now() + 86400e3)
                })
                setCookie('name', response.data.name, {
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
export const sendAvatarRequest = (avatar, userId) => {
    return dispatch => {
        sendAvatarUser(avatar, userId).then(response => {
            if (response.status === 200) {
                const imageFile = avatar.get('image');

                const reader = new FileReader();// Create a new FileReader object
                reader.onload = function () {// Set the onload callback function to get the buffer
                    const bufferAvatar = reader.result;
                    dispatch(setAvatar(bufferAvatar))//set buffer avatar
                };
                reader.readAsArrayBuffer(imageFile);// Read the contents of the file as an ArrayBuffer
            }
        })
    }
}
export const getAvatarRequest = (userId) => {
    return dispatch => {
        getAvatar(userId).then(response => {
            if (response.status === 200) {
                dispatch(setAvatar(response.data.avatar))
            }
        })
    }
}

export default LoginReducer
