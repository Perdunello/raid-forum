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

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllAvatars())
    }, [])

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={`/champions`} element={<HeroesWrapper/>}/>
                <Route path={`/champions/:id`} element={<Hero/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/signup'} element={<Signup/>}/>
                <Route path={'myaccount'} element={<Account/>}/>
            </Routes>
            {/*<Hero/>*/}
        </div>
    );
}

export default App;
