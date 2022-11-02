import {applyMiddleware, combineReducers, createStore} from "redux";
import HeroesReducer from "./HeroesReducer";
import thunk from "redux-thunk";
import LoginReducer from "./LoginReducer";

const reducers = combineReducers({
    heroes: HeroesReducer,
    login: LoginReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store