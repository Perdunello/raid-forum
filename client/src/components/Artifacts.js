import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSetRequest, slide} from "../redux/artifactsReducer";
import styles from '../styles/Artifacts.module.scss'

const Artifacts = () => {
    const dispatch = useDispatch()
    const artifacts = useSelector(state => state.artifacts.artifacts)
    useEffect(() => {
        const id = window.location.pathname.split(`/`)[2]
        dispatch(getSetRequest(id))
    }, [])

    const changeSlider = (action) => {
        dispatch(slide(action))
    }
    return <div className={styles.mainWrapper}>
        <div className={styles.artifactsWrapper}>
            {
                artifacts.slice(0, 3).map((artifact) => {
                    const lowerName = artifact.name.toLowerCase()
                    return <div key={artifact.id} className={styles.artifact}>
                        <div style={{marginBottom: '20px'}}>
                            {artifact.name}
                        </div>
                        <img className={styles.images} src={artifact.image_link} width={120} height={120}
                             alt={artifact.name + ' item Raid Shadow Legends'}/>
                        <h1 style={{margin: '15px 0', borderBottom: '3px solid #6c757d'}}>Primary Stats</h1>
                        {
                            lowerName.includes('weapon') ? <div className={styles.statsWrapper}>
                                    <div style={{fontSize: '14px'}}>ATK</div>
                                    <h1>Substats</h1>
                                    <div style={{fontSize: '14px'}}>HP, HP %, ATK %, SPD, C.RATE %, C.DMG %, RESIST, ACC
                                    </div>
                                </div>
                                : lowerName.includes('helmet')
                                    ? <div className={styles.statsWrapper}>
                                        <div style={{fontSize: '14px'}}>HP</div>
                                        <h1>Substats</h1>
                                        <div style={{fontSize: '14px'}}>HP %, ATK, ATK %, DEF, DEF %, C.RATE %, C.DMG %,
                                            SPD, RESIST, ACC
                                        </div>
                                    </div>
                                    : lowerName.includes('shield')
                                        ? <div className={styles.statsWrapper}>
                                            <div style={{fontSize: '14px'}}>DEF</div>
                                            <h1>Substats</h1>
                                            <div style={{fontSize: '14px'}}>HP, HP %, DEF %, SPD, C.RATE %, C.DMG %, RESIST,
                                                ACC
                                            </div>
                                        </div>
                                        : lowerName.includes('gauntlets')
                                            ? <div className={styles.statsWrapper}>
                                                <div style={{fontSize: '14px'}}>C.RATE %, C.DMG %, ATK, ATK %, HP, HP %,
                                                    DEF, DEF %
                                                </div>
                                                <h1>Substats</h1>
                                                <div style={{fontSize: '14px'}}>HP, HP %, ATK, ATK %, DEF, DEF %, SPD,
                                                    C.RATE %, C.DMG %, RESIST, ACC
                                                </div>
                                            </div>
                                            : lowerName.includes('chestplate')
                                                ? <div className={styles.statsWrapper}>
                                                    <div style={{fontSize: '14px'}}>ACC, RESIST, HP, HP %, ATK, ATK %, DEF,
                                                        DEF %
                                                    </div>
                                                    <h1>Substats</h1>
                                                    <div style={{fontSize: '14px'}}>HP, HP %, ATK, ATK %, DEF, DEF %, SPD,
                                                        C.RATE %, C.DMG %, RESIST,
                                                        ACC
                                                    </div>
                                                </div>
                                                : <div className={styles.statsWrapper}>
                                                    <div style={{fontSize: '14px'}}>SPD, HP, HP %, ATK, ATK %, DEF, DEF %
                                                    </div>
                                                    <h1>Substats</h1>
                                                    <div style={{fontSize: '14px'}}>HP, HP %, ATK, ATK %, DEF, DEF %, SPD,
                                                        C.RATE %, C.DMG %, RESIST,
                                                        ACC
                                                    </div>
                                                </div>
                        }
                    </div>
                })
            }
        </div>
        <div className={styles.buttons}>
            <button onClick={() => changeSlider('minus')}></button>
            <button onClick={() => changeSlider('plus')}></button>
        </div>
        <div className={styles.blurWrapper}>
            <div></div>
            <div></div>
        </div>
    </div>
}

export default Artifacts