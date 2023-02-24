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
        setAvatar(e.target.files[0])
    }

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="submit" value={'Log out'}/>
            <input type="file" onChange={setImg}/>
            {avatar && <img src={URL.createObjectURL(avatar)} width={'200px'} height={'auto'} alt={avatar.name}/>}
        </form>
    </div>
}
export default Account