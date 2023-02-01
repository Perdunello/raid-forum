import styles from '../styles/Hero.module.scss'
import {useEffect} from "react";
import {getHero} from "../redux/HeroesReducer";
import {useDispatch, useSelector} from "react-redux";

const Hero = () => {
    const heroData = useSelector(state => state.heroes.heroData)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHero(window.location.pathname.split(`/`)[2]))
    }, [dispatch])
    if (!Object.keys(heroData).length) {
        return <div>
            some wrong
        </div>
    }
    return <div className={styles.main}>
        <div className={styles.paramsWrapper}>
            <div className={styles.params}>
                <div className={styles.param}>
                    <div>HP</div>
                    <div>{heroData.param.HP}</div>
                </div>
                <div className={styles.param}>
                    <div>Attack</div>
                    <div>{heroData.param.Attack}</div>
                </div>
                <div className={styles.param}>
                    <div>Defense</div>
                    <div>{heroData.param.Defense}</div>
                </div>
                <div className={styles.param}>
                    <div>Speed</div>
                    <div>{heroData.param.Speed}</div>
                </div>
                <div className={styles.param}>
                    <div>CritRate</div>
                    <div>{heroData.param.CritRate} %</div>
                </div>
                <div className={styles.param}>
                    <div>CritDamage</div>
                    <div>{heroData.param.CritDamage} %</div>
                </div>
                <div className={styles.param}>
                    <div>Accuracy</div>
                    <div>{heroData.param.Accuracy}</div>
                </div>
                <div className={styles.param}>
                    <div>Resistance</div>
                    <div>{heroData.param.Resistance}</div>
                </div>
            </div>
        </div>
        <div className={styles.midPart}>
            <div style={{backgroundColor: '#4d4c4c', borderRadius: '25px 25px 0 0', padding: '40px 20px'}}>
                <div style={{fontSize: '40px'}}>{heroData.name}</div>
                <div className={[styles.avatarWrapper, heroData.rarity === 'Legendary'
                    ? styles.legendary
                    : heroData.rarity === 'Epic'
                        ? styles.epic
                        : heroData.rarity === 'Rare'
                            ? styles.rare
                            : heroData.rarity === 'Uncommon'
                                ? styles.uncommon
                                : styles.common].join(' ')}><img
                    src={heroData.avatar_link} width={200} alt=""/>
                    {/*<img src="/heroes/Rotos-the-Lost-Groom/Rotos_the_Lost_Groom.png" className={styles.ava} alt=""/>*/}
                </div>
                <div className={styles.mainInfo}>
                    <div className={styles.infoItemWrapper}>
                        <div className={styles.infoTitle}>Faction</div>
                        <div className={styles.infoItem}>
                            <div className={styles.imgWrapper}>
                                <img style={{margin: '10px 0'}} width={70}
                                     src={`/champions/factions/${heroData.faction}.png`}
                                     alt=""/>
                            </div>
                            <div>{heroData.faction}</div>
                        </div>
                    </div>
                    <div className={styles.infoItemWrapper}>
                        <div className={styles.infoTitle}>Affinity</div>
                        <div className={styles.infoItem}>
                            <div className={styles.imgWrapper}>
                                <img style={{margin: '10px 0'}} width={50}
                                     src={`/champions/affinities/${heroData.affinity}.png`}
                                     alt=""/>
                            </div>
                            <div>{heroData.affinity}</div>
                        </div>
                    </div>
                    <div className={styles.infoItemWrapper}>
                        <div className={styles.infoTitle}>Rarity</div>
                        <div className={styles.infoItem}>
                            <div className={styles.imgWrapper}>
                                <img style={{margin: '10px 0'}} width={50}
                                     src={`/champions/rarity/${heroData.rarity}.png`}
                                     alt=""/>
                            </div>
                            <div>{heroData.rarity}</div>
                        </div>
                    </div>
                    <div className={styles.infoItemWrapper}>
                        <div className={styles.infoTitle}>Role</div>
                        <div className={styles.infoItem}>
                            <div className={styles.imgWrapper}>
                                <img style={{margin: '10px 0'}} width={50} src={`/champions/role/${heroData.role}.png`}
                                     alt=""/>
                            </div>
                            <div>{heroData.role}</div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: '30px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                    aliquid amet, animi aperiam
                    architecto at debitis deleniti doloribus enim impedit, in laboriosam, minima molestias numquam odio
                    provident recusandae sunt tenetur velit vitae. Aut commodi eligendi fuga hic labore molestias
                    mollitia, ratione reiciendis sed. Accusantium blanditiis deleniti dicta impedit in inventore iusto
                    magnam nostrum obcaecati officiis optio praesentium sit tempora, tenetur veniam, voluptatem
                    voluptatibus. Ab accusamus aperiam autem blanditiis deleniti dignissimos dolor ducimus earum, est et
                    inventore itaque labore laborum laudantium maiores minus modi nihil, non numquam obcaecati optio
                    pariatur quasi quos saepe soluta suscipit tempore. Ab blanditiis nam officia repellendus.
                </div>
            </div>
        </div>
        <div className={styles.skillsWrapper}>
            {heroData.skills.map(skill => {
                return <div key={skill.id} className={styles.skills}>
                    <div>
                        {/*<img src={skill.image_link} className={styles.skillBase} alt=""/>*/}
                        <div
                            className={[styles.noImg, skill.cooldown !== 'aura' ? styles.skillSimple : styles.skillAura].join(' ')}>
                            <img src={skill.image_link} style={{width: '100%'}} alt=""/>
                        </div>
                        <div className={styles.cooldown}>
                            {skill.cooldown === 'none'
                                ? ''
                                : skill.cooldown === 'passive'
                                    ? 'passive'
                                    : skill.cooldown === 'Aura'
                                        ? 'aura'
                                        : `${skill.cooldown} turns`}
                        </div>
                    </div>
                    <div className={styles.infoSkill}>
                        <div style={{color: 'white', fontSize: '20px'}}>{skill.name}</div>
                        <div style={{marginTop: '10px'}}>{skill.text}</div>
                        {<div className={styles.buffdebuffWrapper}>
                            {skill.buffdebuff.map(buffdebuff => {
                                return <div key={buffdebuff.id} className={styles.buffdebuff}><img
                                    src={buffdebuff.image_link} width={35} alt=""/></div>
                            })}
                        </div>}
                        <div className={styles.levelsWrapper}>
                            {skill.levels.map(level => {
                                return <div key={level.id} className={styles.level}>
                                    <div>Level {level.level} :</div>
                                    <div>{level.text}</div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            })}
        </div>

    </div>
}

export default Hero