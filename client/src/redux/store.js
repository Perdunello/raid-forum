import {applyMiddleware, combineReducers, createStore} from "redux";
import HeroesReducer from "./HeroesReducer";
import thunk from "redux-thunk";
import LoginReducer from "./LoginReducer";
import ForumReducer from "./ForumReducer";
import ArtifactsReducer from "./artifactsReducer";

const reducers = combineReducers({
    heroes: HeroesReducer,
    login: LoginReducer,
    forum: ForumReducer,
    artifacts: ArtifactsReducer,

})

const store = createStore(reducers, applyMiddleware(thunk))

export default store