import styles from '../styles/Login.module.scss'
import {useRef} from "react";
import {NavLink} from "react-router-dom";

const Login = () => {
    const inputRef = useRef()
    const toggleShowPassword = (e) => {
        if (e.target.src.includes('eye_hide')) {
            e.target.src = '/loginisation/eye_show.svg'
            inputRef.current.type = 'text'
        } else {
            e.target.src = '/loginisation/eye_hide.svg'
            inputRef.current.type = 'password'
        }

    }
    return <div className={styles.main}>
        <form action="">
            <div className={styles.wrapper}><input type="text" placeholder={'Enter your name or email'}/></div>
            <div className={styles.wrapper}>
                <input ref={inputRef} type="password" placeholder={'Enter your password'}/>
                <img className={styles.eyePassword} onClick={toggleShowPassword} src="/loginisation/eye_hide.svg"
                     alt=""/>
            </div>
            <div className={[styles.wrapper]} style={{margin: '15px 0'}}><span
                className={styles.link}>Forgot password?</span></div>
            <div className={styles.wrapper}>
                <button style={{background: '#0057ff', color: 'white', cursor: 'pointer'}}>Log in</button>
            </div>
            <div className={styles.wrapper} style={{margin: '15px 0'}}>Don`t have an account? <NavLink to={'/signup'}><span
                className={styles.link}>Sign up</span></NavLink></div>
        </form>
    </div>
}
export default Login
