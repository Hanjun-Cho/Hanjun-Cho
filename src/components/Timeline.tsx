import styles from './Timeline.module.css'

export default function Timeline({ color }: { color: string }) {
    return (
        <div className={styles.timeline} aria-hidden="true">
            <span className={styles.timeline_line} style={{ background: color }} />
        </div>
    )
}
