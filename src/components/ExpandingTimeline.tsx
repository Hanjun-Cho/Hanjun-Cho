import { useState } from 'react'
import styles from './ExpandingTimeline.module.css'
import ExpandedTimelineItem from './ExpandedTimelineItem'
import type { TimelineEntry } from '../pages/Experience'

export default function ExpandingTimeline({
    experiences,
    onSelect,
}: {
    experiences: TimelineEntry[]
    onSelect: (title: string | null) => void
}) {
    const [selected, setSelected] = useState<number | null>(null)

    const handleSelect = (i: number, title: string) => {
        setSelected((prev) => {
            const next = prev === i ? null : i
            onSelect(next === null ? null : title)
            return next
        })
    }

    return (
        <div className={styles.container}>
            {experiences.map((entry, i) => (
                <ExpandedTimelineItem
                    key={i}
                    title={entry.title}
                    subtitle={entry.subtitle}
                    tags={entry.tags}
                    selected={selected === i}
                    onSelect={() => handleSelect(i, entry.title)}
                />
            ))}
        </div>
    )
}
