import styles from '../styles/Header.module.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
    const isAuth = useSelector(state => state.login.isAuth)
    return <header>
        <div className={styles.logo}>Logo</div>
        <ul className={styles.links}>
            <NavLink to={`/champions/`}>
                <li className={styles.link}>Heroes</li>
            </NavLink>
            <li className={styles.link}>Bla-Bla</li>
            <li className={styles.link}>Blu-Blu</li>
            {!isAuth
                ? <NavLink to={'/login'}>
                    <li className={styles.link}>Login</li>
                </NavLink>
                : <NavLink to={'/myaccount'}>
                    <li className={styles.link}>My Account</li>
                </NavLink>}
        </ul>
    </header>
}

export default Header