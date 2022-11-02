import styles from "../styles/Heroes.module.scss";

const HeroView = ({hero}) => {
    return <div className={styles.hero}>
        <div>{hero.name}</div>
        <div className={styles.hero__view}>
            <img src={hero.avatar} alt="" className={styles.ava}/>
            <img className={styles.affinity}
                 src={hero.affinity === 'magic'
                     ? '/affinities/magic.png' : hero.affinity === 'spirit'
                         ? '/affinities/spirit.png' : hero.affinity === 'force'
                             ? '/affinities/force.png' : '/affinities/void.png'}
                 width={'30%'} alt=""/>
        </div>
    </div>
}

export default HeroView