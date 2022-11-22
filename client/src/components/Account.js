import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../redux/LoginReducer";
import {Navigate} from "react-router-dom";

const Account = () => {
    const {handleSubmit} = useForm()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.login.isAuth)
    const onSubmit = () => {
        dispatch(logOut())

    }
    if (!isAuth) {
        return <Navigate to={'/'}/>
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="submit" value={'Log out'}/>
            {/*<button onClick={logOut}>Log out</button>*/}
        </form>
    </div>
}
export default Account