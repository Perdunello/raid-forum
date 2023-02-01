import styles from "../styles/Heroes.module.scss";

const HeroView = ({hero}) => {
    return <div className={styles.hero}>
        <div
            className={[styles.hero__view, hero.rarity === 'Legendary'
                ? styles.legendary
                : hero.rarity === 'Epic'
                    ? styles.epic
                    : hero.rarity === 'Rare'
                        ? styles.rare
                        : hero.rarity === 'Uncommon'
                            ? styles.uncommon
                            : styles.common].join(' ')}>
            <div className={styles.avatarWrapper}>
                <img src={hero.avatar} alt="" className={styles.ava}/>
                {/*<img src="/heroes/Rotos-the-Lost-Groom/Rotos_the_Lost_Groom.png" className={styles.ava} alt=""/>*/}
            </div>
            <img className={styles.affinity}
                 src={hero.affinity === 'Magic'
                     ? '/affinities/magic.png' : hero.affinity === 'Spirit'
                         ? '/affinities/spirit.png' : hero.affinity === 'Force'
                             ? '/affinities/force.png' : '/affinities/void.png'}
                 width={'30%'} alt=""/>
        </div>
        <div className={styles.name} style={{marginTop:'15px'}}>{hero.name}</div>
    </div>
}

export default HeroView
