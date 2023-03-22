import './App.css';
import Header from "./components/Header";
import HeroesWrapper from "./components/HeroesWrapper";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAllAvatars} from "./redux/HeroesReducer";
import Hero from "./components/Hero";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Account from "./components/Account";
import Forum from "./components/Forum";
import {setAuth} from "./redux/LoginReducer";
import {getCookie} from "./api/cookies";
import Sets from "./components/Sets";
import Footer from "./components/Fotter";
import Artifacts from "./components/Artifacts";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllAvatars())
        if (getCookie('id') && getCookie('name') && getCookie('email') && getCookie('password')) {
            dispatch(setAuth({
                id: getCookie('id'),
                name: getCookie('name'),
                email: getCookie('email'),
                password: getCookie('password')
            }))
        }
    }, [])
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={`/champions`} element={<HeroesWrapper/>}/>
                <Route path={`/champions/:id`} element={<Hero/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/signup'} element={<Signup/>}/>
                <Route path={'/myaccount'} element={<Account/>}/>
                <Route path={'/forum'} element={<Forum/>}/>
                <Route path={'/artifacts'} element={<Sets/>}/>
                <Route path={'/artifacts/:id'} element={<Artifacts/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
