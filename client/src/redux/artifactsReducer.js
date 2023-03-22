import {getSet, getSetsIcons} from "../api/api";

const SET_ALL_SETS = 'SET_ALL_SETS'
const SET_ARTIFACTS = 'SET_ARTIFACTS'
const PLUS_SLIDE = 'PLUS_SLIDE'
const MINUS_SLIDE = 'MINUS_SLIDE'

const initialState = {
    setsData: [],
    artifacts: [],
}

const ArtifactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_SETS:
            return {
                ...state,
                setsData: action.payload
            }
        case SET_ARTIFACTS:
            return {
                ...state,
                artifacts: action.payload
            }
        case PLUS_SLIDE:
            return {
                ...state,
                artifacts: state.artifacts.map((el, index) => {
                    if (index + 1 >= state.artifacts.length) {
                        return state.artifacts[0]
                    }
                    return state.artifacts[index + 1]
                })
            }
        case MINUS_SLIDE:
            return {
                ...state,
                artifacts: state.artifacts.map((el, index) => {
                    if (index - 1 < 0) {
                        return state.artifacts[state.artifacts.length - 1]
                    }
                    return state.artifacts[index - 1]
                })
            }
        default:
            return state
    }
}

const setSets = (payload) => {
    return {type: SET_ALL_SETS, payload}
}
const setArtifacts = (payload) => {
    return {type: SET_ARTIFACTS, payload}
}
export const slide = (action) => {
    if (action === 'plus')
        return {type: PLUS_SLIDE}
    else
        return {type: MINUS_SLIDE}
}
export const getSetsRequest = () => {
    return dispatch => {
        getSetsIcons().then(response => {
            if (response.status === 200) {
                dispatch(setSets(response.data))
            }
        })
    }
}
export const getSetRequest = (id) => {
    return (dispatch) => {
        getSet(id).then(response => {
            if (response.status === 200) {
                dispatch(setArtifacts(response.data))
            }
        })
    }
}
export default ArtifactsReducer