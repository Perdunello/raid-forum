import styles from '../styles/Login.module.scss'
import {useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {logInRequest} from "../redux/LoginReducer";

const Login = () => {
    const {handleSubmit, register} = useForm({mode: "onBlur"})
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.login.isAuth)

    const [typePass, setTypePass] = useState('password')
    const [srcImg, setSrcImg] = useState('/loginisation/eye_hide.svg')

    const toggleShowPassword = (e) => {
        if (e.target.src.includes('eye_hide')) {
            setTypePass('text')
            setSrcImg('/loginisation/eye_show.svg')
        } else {
            setTypePass('password')
            setSrcImg('/loginisation/eye_hide.svg')
        }

    }
    const onSubmit = (data) => {
        dispatch(logInRequest(data.email, data.password))
    }
    if (isAuth) {
        return <Navigate to={'/'}/>
    }
    return <div className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.wrapper}>
                <input type="text"{...register('email')} placeholder={'Enter your name or email'}/></div>
            <div className={styles.wrapper}>
                <input  {...register('password')} type={typePass} placeholder={'Enter your password'}/>
                <img className={styles.eyePassword} onClick={toggleShowPassword} src={srcImg}
                     alt=""/>
            </div>
            <div className={[styles.wrapper]} style={{margin: '15px 0'}}><span
                className={styles.link}>Forgot password?</span></div>
            <div className={styles.wrapper}>
                <button style={{background: '#0057ff', color: 'white', cursor: 'pointer'}}>Log in</button>
            </div>
            <div className={styles.wrapper} style={{margin: '15px 0'}}>Don`t have an account? <NavLink
                to={'/signup'}><span
                className={styles.link}>Sign up</span></NavLink></div>
        </form>
    </div>
}
export default Login
