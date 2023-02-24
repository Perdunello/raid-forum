import styles from '../styles/Heroes.module.scss'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAvatars} from "../redux/HeroesReducer";
import HeroView from "./HeroView";
import {NavLink} from "react-router-dom";

const HeroesWrapper = () => {
    const avatars = useSelector(state => state.heroes.avatars)
    const receivedAvatars = useSelector(state => state.heroes.receivedAvatars)
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({})
    const [searchName, setSearchName] = useState('')
    const ref = useRef()
    const [hiddenFilters, setHiddenFilters] = useState([])
    useEffect(() => {
        dispatch(getAllAvatars())
    }, [])

    const addFilter = (filter, value) => {
        if (Object.keys(filters).includes(filter)) {//if obj includes existed filter
            if (!(filters[filter].includes(value))) { //add filter, if it is not exists yet
                setFilters({
                    ...filters,
                    [filter]: [...filters[filter], value]
                })
            } else {//delete filter,if it already exists
                const copy = {
                    ...filters,
                    [filter]: [...filters[filter].filter(item => {
                        return item !== value
                    })]
                }
                if (!copy[filter].length) {//deleting key, if it is empty
                    delete copy[filter]
                    // delete filters[filter]
                }
                setFilters(copy)
            }
        } else { //add first filter of type
            setFilters({
                ...filters,
                [filter]: [value]
            })
        }
    }

    const setNewSearchName = () => {
        setSearchName(ref.current.value)
    }

    const toggleHiddenFilters = (filter) => {
        if (hiddenFilters.includes(filter)) {
            setHiddenFilters([...hiddenFilters.filter(item => item !== filter)])
        } else {
            setHiddenFilters([...hiddenFilters, filter])
        }

    }

    const deleteFilters = () => {
        setFilters({})
        setSearchName('')
    }

    if (!receivedAvatars) {
        return <div>wait....</div>
    }
    return <div className={styles.main}>
        <div className={styles.filtersWrapper}>
            <div className={styles.filterWrapper}>
                <div className={styles.nameFilter}>Search</div>
                {<div className={styles.searchWrapper}>
                    <input className={styles.inputSearch} type="search" name='hero-search'
                           placeholder={'Champion name'} ref={ref}/>
                    <div className={styles.loupe} onClick={setNewSearchName} style={{lineHeight: '14px'}}><img
                        src="/common/searchItem.svg" width={20} alt=""/></div>
                </div>}
            </div>
            <div className={styles.filterWrapper}>
                <div style={{display: 'flex', alignItems: 'center', margin: '40px 0 20px 0'}}
                     onClick={() => toggleHiddenFilters('ByAffinity')}>
                    <div className={styles.nameFilter}>By Affinity
                    </div>
                    <img src="/common/arrow.svg"
                         className={hiddenFilters.includes('ByAffinity') ? '' : styles.rotatedArrow} width={24}
                         height={24} alt="arrow"/>
                </div>
                {hiddenFilters.includes('ByAffinity') ? ''
                    : <div>
                        <li className={[styles.filter, filters.affinity?.includes('Magic') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('affinity', 'Magic')}>Magic
                        </li>
                        <li className={[styles.filter, filters.affinity?.includes('Spirit') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('affinity', 'Spirit')}>Spirit
                        </li>
                        <li className={[styles.filter, filters.affinity?.includes('Force') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('affinity', 'Force')}>Force
                        </li>
                        <li className={[styles.filter, filters.affinity?.includes('Void') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('affinity', 'Void')}>Void
                        </li>
                    </div>}
            </div>
            <div className={styles.filterWrapper}>
                <div style={{display: 'flex', alignItems: 'center', margin: '40px 0 20px 0'}}
                     onClick={() => toggleHiddenFilters('ByRarity')}>
                    <div className={styles.nameFilter}>By Rarity</div>
                    <img src="/common/arrow.svg"
                         className={hiddenFilters.includes('ByRarity') ? '' : styles.rotatedArrow} width={24}
                         height={24} alt="arrow"/>
                </div>
                {hiddenFilters.includes('ByRarity') ? ''
                    : <div>
                        <li className={[styles.filter, filters.rarity?.includes('Common') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('rarity', 'Common')}>Common
                        </li>
                        <li className={[styles.filter, filters.rarity?.includes('Uncommon') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('rarity', 'Uncommon')}>Uncommon
                        </li>
                        <li className={[styles.filter, filters.rarity?.includes('Rare') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('rarity', 'Rare')}>Rare
                        </li>
                        <li className={[styles.filter, filters.rarity?.includes('Epic') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('rarity', 'Epic')}>Epic
                        </li>
                        <li className={[styles.filter, filters.rarity?.includes('Legendary') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('rarity', 'Legendary')}>Legendary
                        </li>
                    </div>}
            </div>
            <div className={styles.filterWrapper}>
                <div style={{display: 'flex', alignItems: 'center', margin: '40px 0 20px 0'}}
                     onClick={() => toggleHiddenFilters('ByRole')}>
                    <div className={styles.nameFilter}>By Role</div>
                    <img src="/common/arrow.svg"
                         className={hiddenFilters.includes('ByRole') ? '' : styles.rotatedArrow} width={24}
                         height={24} alt="arrow"/>
                </div>
                {hiddenFilters.includes('ByRole') ? ''
                    :
                    <div>
                        <li className={[styles.filter, filters.role?.includes('Attack') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('role', 'Attack')}>Attack
                        </li>
                        <li className={[styles.filter, filters.role?.includes('Support') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('role', 'Support')}>Support
                        </li>
                        <li className={[styles.filter, filters.role?.includes('Defense') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('role', 'Defense')}>Defense
                        </li>
                        <li className={[styles.filter, filters.role?.includes('HP') ? styles.activeFilter : ''].join(' ')}
                            onClick={() => addFilter('role', 'HP')}>HP
                        </li>
                    </div>}
            </div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <button onClick={deleteFilters} className={styles.resetButton}>Reset Filters</button>
            </div>
        </div>
        <div className={styles.heroes}>
            <div className={styles.countHeroes}>Champions found:{avatars.length}</div>
            <div className={styles.heroesWrapper}>{avatars.map(hero => {
                if ((!Object.keys(filters).length || ((!filters.affinity || filters.affinity.includes(hero.affinity)) && (!filters.rarity || filters.rarity.includes(hero.rarity)) && (!filters.role || filters.role.includes(hero.role)))) && (hero.name.toLowerCase().includes(searchName.toLowerCase()))) {
                    return (
                        <NavLink key={hero.id} to={`${hero.id}`} className={styles.linkHero}>
                            <HeroView hero={hero}/>
                        </NavLink>
                    )
                }
            })
            }</div>
        </div>
    </div>
}

export default HeroesWrapper