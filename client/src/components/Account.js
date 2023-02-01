import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../redux/LoginReducer";
import {Navigate} from "react-router-dom";
import {useState} from "react";

const Account = () => {
    const {handleSubmit} = useForm()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.login.isAuth)
    const [avatar, setAvatar] = useState('')
    const onSubmit = () => {
        dispatch(logOut())

    }
    const setImg = (e) => {
        console.log(e.target.value)
        setAvatar(e.target.value)
    }

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="submit" value={'Log out'}/>
            {/*<button onClick={logOut}>Log out</button>*/}
            <input type="file" onChange={setImg}/>
            <img src={avatar} alt="photo preview"/>
        </form>
    </div>
}
export default Account