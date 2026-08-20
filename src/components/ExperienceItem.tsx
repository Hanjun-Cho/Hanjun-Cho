import type { CSSProperties } from 'react'
import styles from './ExperienceItem.module.css'

export interface ExperienceItemProps {
    company: string
    position: string
    duration: string
    location: string
    thoughts: string
    above?: boolean
    style?: CSSProperties
}

export default function ExperienceItem({
    company,
    position,
    duration,
    location,
    thoughts,
    above = true,
    style,
}: ExperienceItemProps) {
    return (
        <div
            className={styles.item}
            style={style}
        >
            <span className={styles.dot} />
            <div className={`${styles.box} ${above ? styles.box_above : styles.box_below}`}>
                <span className={styles.company}>{company}</span>
                <span className={styles.position}>{position}</span>
                <span className={styles.meta}>{duration}</span>
                <span className={styles.meta}>{location}</span>
                <span className={styles.thoughts}>{thoughts}</span>
            </div>
        </div>
    )
}
