import styles from './Team.module.css'
import type { Team as TeamInfo } from '../App'

export default function Team({ team }: { team: TeamInfo }) {
    return (
        <div className={styles.box} style={{background: team.secondaryColor}}>
            <div className={styles.left}>
                <img className={styles.image} src={team.logo} alt="" />
            </div>
            <div className={styles.right}>
                <span className={styles.team_name}>{team.name}</span>
                <span className={styles.city_name}>{team.city}</span>
            </div>
        </div>
    )
}
