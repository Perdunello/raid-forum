const ADD_MESSAGE = 'ADD_MESSAGE'
const SET_MESSAGES = 'SET_MESSAGES'

const initialState = {
    messages: [],

}
const ForumReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        default :
            return state
    }

}
const addMessage = (payload) => {
    return {type: ADD_MESSAGE, payload}
}
export const setMessages = (payload) => {
    return {type: SET_MESSAGES, payload}
}

export const getMessagesRequest = (socket) => {
    return (dispatch) => {
        socket.emit('get-messages', () => {
        })
    }
}
export const addMessageRequest = (name, message, time, date) => {
    return (dispatch) => {
        dispatch(addMessage({
            name,
            message,
            avatar: '/heroes/Rotos-the-Lost-Groom/Rotos_the_Lost_Groom.png',
            time,
            date
        }))
    }
}
export default ForumReducer