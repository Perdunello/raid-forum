import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSetsRequest} from "../redux/artifactsReducer";
import styles from '../styles/Artifacts.module.scss'
import {NavLink} from "react-router-dom";

const Sets = () => {
    const artifacts = useSelector(state => state.artifacts.setsData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSetsRequest())
    }, [])

    return <div className={styles.main}>
        {
            artifacts.map((artifact) => {
                return <NavLink  key={artifact.id} to={`${artifact.id}`}>
                    <div className={styles.artifactIconWrapper}>
                        <div>{artifact.name} </div>
                        <div>
                            <img src={artifact.image_link} width={40} height={40} style={{objectFit: 'contain'}}
                                 alt={artifact.name + " artifact icon Raid Shadow Legends"}/>
                        </div>

                    </div>
                </NavLink>
            })
        }
    </div>
}

export default Sets