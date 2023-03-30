import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {logOut, sendAvatarRequest} from "../redux/LoginReducer";
import {Navigate} from "react-router-dom";
import styles from '../styles/Account.module.scss'
import {Buffer} from 'buffer';

const Account = () => {
    const {handleSubmit} = useForm()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.login.isAuth)
    const authData = useSelector(state => state.login.authData)
    const onSubmit = () => {
        dispatch(logOut())

    }
    const setImg = (e) => {
        let formData = new FormData()
        formData.append('image', e.target.files[0])
        dispatch(sendAvatarRequest(formData, authData.id))
    }

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return <div className={styles.main}>
        <img
            src={authData.avatar ? `data:image/png;base64,${Buffer.from(authData.avatar).toString('base64')}` : "/common/simpleAvatar.png"}
            width={150} height={150}
            className={styles.avatar} alt={`avatar of user ${authData.id}`}/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div><input type="submit" value={'Log out'}/></div>
            <div className={styles.fileUpload}>
                <div>Chose new avatar</div>
                <input type="file" onChange={setImg} className={styles.fileInput} accept=".jpg, .jpeg, .png, .svg"
                       multiple={false}/>
            </div>
        </form>
    </div>
}
export default Account