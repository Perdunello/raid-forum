import {getAllAvatarsAPI, getHeroAPI} from "../api/api";

const SET_HERO = 'SET_HERO'
const SET_ALL_AVATARS = 'SET_ALL_AVATARS'

const initialState = {
    heroData: {},
    avatars: [],
    receivedAvatars: false,
}

const HeroesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HERO:
            return {
                ...state,
                heroData: action.payload
            }
        case SET_ALL_AVATARS:
            return {
                ...state,
                avatars: action.payload,
                receivedAvatars: true
            }
        default:
            return state
    }
}

const setHero = (payload) => {
    return {type: SET_HERO, payload}
}

export const getHero = (id) => {
    return (dispatch) => {
        getHeroAPI(id).then(response => {
            if (response.status === 200) {
                dispatch(setHero(response.data))
            }
        })
    }
}

const setAllAvatars = (payload) => {
    return {type: SET_ALL_AVATARS, payload}
}

export const getAllAvatars = () => {
    return (dispatch) => {
        getAllAvatarsAPI().then(response => {
            if (response.status === 200) {
                dispatch(setAllAvatars(response.data))
            }
        })
    }
}
export default HeroesReducer