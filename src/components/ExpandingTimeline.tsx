import { useEffect, useRef, useState } from 'react'
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
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            if (el.scrollHeight > el.clientHeight) {
                const max = el.scrollHeight - el.clientHeight
                el.scrollTop = Math.min(max, Math.max(0, el.scrollTop + e.deltaY))
            }
        }

        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [])

    const handleSelect = (i: number, title: string) => {
        setSelected((prev) => {
            const next = prev === i ? null : i
            onSelect(next === null ? null : title)
            return next
        })
    }

    return (
        <div className={styles.container} ref={containerRef}>
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
