import styles from "../styles/Login.module.scss";
import {useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {isExistAccount} from "../api/api";
import {useDispatch, useSelector} from "react-redux";
import {signUpRequest} from "../redux/LoginReducer";

const Signup = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onBlur'})

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.login.isAuth)
    console.log(isAuth)
    const [password, setPassword] = useState('')
    const [copyPassword, setCopyPassword] = useState('')
    const [isExistEmail, setIsExistEmail] = useState(false)

    const [typePass, setTypePass] = useState('password')
    const [srcImg, setSrcImg] = useState('/loginisation/eye_hide.svg')

    const onSubmit = (data) => {
        isExistAccount(data.email).then(isExist => {
            if (isExist) {
                setIsExistEmail(true)
            }
            if (data.password === data.copyPassword && !isExist) {
                delete data.copyPassword;
                dispatch(signUpRequest(data))
                reset()
            }
        });
    }

    const toggleShowPassword = (e) => {
        if (e.target.src.includes('eye_hide')) {
            setTypePass('text')
            setSrcImg('/loginisation/eye_show.svg')
        } else {
            setTypePass('password')
            setSrcImg('/loginisation/eye_hide.svg')
        }

    }

    const isSamePasswords = () => {
        return password !== copyPassword
    }
    if (isAuth) {
        return <Navigate to={'/'}/>
    }
    return <div className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className={styles.wrapper}>
                <input type="text" placeholder={'Enter your name'} {...register('name', {
                    required: true,
                })}/>
            </div>
            {errors.name && errors.name.type === "required" && <span className={styles.error}>This is required</span>}
            <div className={styles.wrapper}>
                <input type="email"
                       placeholder={'Enter your email'} {...register('email', {
                    required: 'This field is required',
                    onChange: () => setIsExistEmail(false)
                })}/>
            </div>
            {(errors.email && errors.email.type === 'required' &&
                <span className={styles.error}>{errors.email.message}</span>) || (isExistEmail &&
                <span className={styles.error}>Account with this email is already exist</span>)}
            <div className={styles.wrapper}>
                <input type={typePass}
                       placeholder={'Enter your password'}
                       {...register('password', {
                           required: 'This field is required',
                           minLength: 8,
                           value: password,
                           onChange: (e) => setPassword(e.target.value),
                       })}
                       autoComplete="new-password"
                />
                <img className={styles.eyePassword} onClick={toggleShowPassword}
                     src={srcImg} alt=""/>
            </div>
            {
                errors.password && ((errors.password.type === 'required' &&
                        <span className={styles.error}>{errors.password.message}</span>) ||
                    (errors.password.type === "minLength" &&
                        <span className={styles.error}>Min length is 8 symbols</span>))
            }
            <div className={styles.wrapper}>
                <input type={typePass}
                       placeholder={'Repeat your password'}
                       {...register('copyPassword', {
                           required: 'This field is required',
                           value: copyPassword,
                           onChange: (e) => setCopyPassword(e.target.value),
                       })}
                />
                <img className={styles.eyePassword} onClick={toggleShowPassword}
                     src={srcImg} alt=""/>
            </div>
            {isSamePasswords() && <span className={styles.error}>The passwords must be the same!</span>}
            <div className={styles.wrapper} style={{marginTop: '35px'}}>
                <button>Create account</button>
            </div>
            <div className={styles.wrapper} style={{margin: '15px 0'}}>Do you have an account?
                <NavLink to={'/login'}>
                    <span className={styles.link}> Log in</span>
                </NavLink>
            </div>
        </form>
    </div>
}

export default Signup