import styles from '../styles/Heroes.module.scss'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAvatars} from "../redux/HeroesReducer";
import HeroView from "./HeroView";
import {NavLink} from "react-router-dom";

const HeroesWrapper = () => {
    const avatars = useSelector(state => state.heroes.avatars)
    const receivedAvatars = useSelector(state => state.heroes.receivedAvatars)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllAvatars())
    }, [])

    if (!receivedAvatars) {
        return <div>wait....</div>
    }
    return <div className={styles.main}>
        <div>
            Filters
        </div>
        <div className={styles.heroes}>{
            avatars.map(hero => {
                return (
                    <NavLink key={hero.id} to={`${hero.id}`} className={styles.linkHero}>
                        <HeroView hero={hero}/>
                    </NavLink>
                )
            })
        }</div>
    </div>
}

export default HeroesWrapper