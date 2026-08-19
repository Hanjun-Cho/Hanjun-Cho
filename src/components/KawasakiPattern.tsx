import { useEffect, useRef, useState } from 'react'
import styles from './KawasakiPattern.module.css'

const LINE_COUNT = 10
const SPEED = 15
const MARGIN = 250
const SHOULDER = 0.8
const DECAY = 1.5

export default function KawasakiPattern() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const [lines, setLines] = useState<number[]>([])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const measure = () => setWidth(container.clientWidth)
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [])

    useEffect(() => {
        if (width === 0) return
        const spacing = (width + 2 * MARGIN) / (LINE_COUNT - 2)
        setLines(Array.from({ length: LINE_COUNT }, (_, i) => -MARGIN + (i - 1) * spacing))

        let raf = 0
        let last = performance.now()
        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05)
            last = now
            setLines((prev) => {
                const next = prev.map((x) => x - SPEED * dt)
                let minX = Math.min(...next)
                while (minX < -MARGIN) {
                    const idx = next.indexOf(minX)
                    next[idx] = Math.max(...next) + spacing
                    minX = Math.min(...next)
                }
                return next
            })
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [width])

    const opacityFor = (x: number) => {
        const w = width || 1
        const nx = x / w
        if (nx >= SHOULDER) return 1
        const nxMin = -MARGIN / w
        const e = (t: number) => Math.exp(-DECAY * (SHOULDER - t))
        return Math.max(0, Math.min(1, (e(nx) - e(nxMin)) / (1 - e(nxMin))))
    }

    return (
        <div className={styles.kawasaki} ref={containerRef} aria-hidden="true">
            {lines.map((x, i) => (
                <span
                    key={i}
                    className={styles.kawasaki_line}
                    style={{ left: `${x}px`, opacity: opacityFor(x) }}
                />
            ))}
        </div>
    )
}
