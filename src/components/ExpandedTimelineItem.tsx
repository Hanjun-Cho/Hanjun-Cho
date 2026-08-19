import { useState } from 'react'
import styles from './ExpandedTimelineItem.module.css'
import type { Tag } from '../pages/Experience'

interface ExpandedTimelineItemProps {
    title: string
    subtitle: string
    tags: Tag[]
    selected: boolean
    onSelect: () => void
}

export default function ExpandedTimelineItem({
    title,
    subtitle,
    tags,
    selected,
    onSelect,
}: ExpandedTimelineItemProps) {
    const [hovered, setHovered] = useState(false)

    const selectedStyle = {
        border: selected ? '3px solid ' + tags[0].color : hovered ? '3px solid white' : '',
    }

    return (
        <div
            className={styles.item_container}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onSelect}
        >
            <div className={styles.dot} />
            <div className={`${styles.box} ${hovered ? styles.shifted : ''}`} style={selectedStyle}>
                <span className={styles.title_element}>{title}</span>
                <span className={styles.subtitle}>{subtitle}</span>
                <div className={styles.tags}>
                    {tags.map((tag, i) => (
                        <span key={i} className={styles.tag} style={{ background: tag.color }}>
                            {tag.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
