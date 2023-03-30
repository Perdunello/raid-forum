import styles from '../styles/Header.module.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";

const Header = () => {
    const isAuth = useSelector(state => state.login.isAuth)
    const [isShowBurger, setIsShowBurger] = useState(false)
    const toggleBurger = () => {
        setIsShowBurger(!isShowBurger)
    }
    return <header>
        <div className={styles.logo}>Logo</div>
        <ul className={styles.burgerWrapper}>
            <img src="/common/burgerMenu.svg" className={styles.burgerImage} onClick={toggleBurger} width={50}
                 height={50} alt="burger menu"/>
            {isShowBurger ? <div className={styles.linksBurger}>
                <NavLink to={`/champions/`}>
                    <li className={styles.linkBurger}>Heroes</li>
                </NavLink>
                <NavLink to={`/forum/`}>
                    <li className={styles.linkBurger}>Forum</li>
                </NavLink>
                <NavLink to={`/artifacts/`}>
                    <li className={styles.linkBurger}>Artifacts</li>
                </NavLink>
                {!isAuth
                    ? <NavLink to={'/login'}>
                        <li className={styles.linkBurger}>Login</li>
                    </NavLink>
                    : <NavLink to={'/myaccount'}>
                        <li className={styles.linkBurger}>My Account</li>
                    </NavLink>}

            </div> : ''}
        </ul>
        <ul className={styles.links}>
            <NavLink to={`/champions/`}>
                <li className={styles.link}>Heroes</li>
            </NavLink>
            <NavLink to={`/forum/`}>
                <li className={styles.link}>Forum</li>
            </NavLink>
            <NavLink to={`/artifacts/`}>
                <li className={styles.link}>Artifacts</li>
            </NavLink>
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