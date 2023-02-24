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
                <img src={hero.avatar} alt={`${hero.name} avatar`} className={styles.ava}/>
            </div>
            <img className={styles.affinity}
                 src={hero.affinity === 'Magic'
                     ? '/champions/affinities/magic.png' : hero.affinity === 'Spirit'
                         ? '/champions/affinities/spirit.png' : hero.affinity === 'Force'
                             ? '/champions/affinities/force.png' : '/champions/affinities/void.png'}
                 width={'30%'} alt={`${hero.affinity} affinity`}/>
        </div>
        <div className={styles.name} style={{marginTop: '15px'}}>{hero.name}</div>
    </div>
}

export default HeroView
