import { useEffect, useRef, useState } from 'react'
import styles from './TottenhamPattern.module.css'

const BLACK = '#000000'
const WHITE = '#FFFFFF'
const HEX_R = 10
const FLOW_VX = -6
const FLOW_VY = 0
const BASE_WIDTH = 1
const OPACITY = 0.05
const TARGET_TILE = 520

const COL_SPACING = HEX_R * Math.sqrt(3)
const ROW_SPACING = HEX_R * 1.5
const ROW_PERIOD = 2 * ROW_SPACING

function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + (i * Math.PI) / 3
        const x = cx + HEX_R * Math.cos(a)
        const y = cy + HEX_R * Math.sin(a)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
    }
    ctx.closePath()
}

function buildTile(dpr: number) {
    const n = Math.max(1, Math.round(TARGET_TILE / COL_SPACING))
    const m = Math.max(1, Math.round(TARGET_TILE / ROW_PERIOD))
    const tileW = n * COL_SPACING
    const tileH = m * ROW_PERIOD

    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(tileW * dpr))
    canvas.height = Math.max(1, Math.round(tileH * dpr))
    const ctx = canvas.getContext('2d')
    if (!ctx) return { dataUrl: '', tileW, tileH }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalAlpha = OPACITY
    ctx.fillStyle = WHITE
    ctx.strokeStyle = BLACK
    ctx.lineWidth = BASE_WIDTH

    for (let row = 0; row <= 2 * m; row++) {
        const xOff = row % 2 === 1 ? COL_SPACING / 2 : 0
        for (let col = 0; col <= n; col++) {
            const cx = col * COL_SPACING + xOff
            const cy = row * ROW_SPACING
            hexPath(ctx, cx, cy)
            ctx.fill()
            ctx.stroke()
        }
    }

    return { dataUrl: canvas.toDataURL('image/png'), tileW, tileH }
}

export default function TottenhamPattern() {
    const rootRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const tileRef = useRef({ tileW: TARGET_TILE, tileH: TARGET_TILE })
    const offsetRef = useRef({ x: 0, y: 0 })
    const rafRef = useRef(0)
    const lastRef = useRef(0)
    const [imgSrc, setImgSrc] = useState('')
    const [size, setSize] = useState({ w: 800, h: 600 })

    useEffect(() => {
        const dpr = window.devicePixelRatio || 1
        const t = buildTile(dpr)
        tileRef.current = { tileW: t.tileW, tileH: t.tileH }
        setImgSrc(t.dataUrl)
    }, [])

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const measure = () => {
            setSize({ w: window.innerWidth, h: window.innerHeight })
        }
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [])

    useEffect(() => {
        const tick = (now: number) => {
            const dt = Math.min((now - lastRef.current) / 1000, 0.05)
            lastRef.current = now
            const t = tileRef.current
            const o = offsetRef.current
            o.x = ((o.x + FLOW_VX * dt) % t.tileW + t.tileW) % t.tileW
            o.y = ((o.y + FLOW_VY * dt) % t.tileH + t.tileH) % t.tileH
            const inner = innerRef.current
            if (inner) {
                inner.style.transform = `translate3d(${(-o.x).toFixed(2)}px, ${(-o.y).toFixed(2)}px, 0)`
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    const { tileW, tileH } = tileRef.current
    const cols = imgSrc ? Math.ceil((size.w + tileW) / tileW) : 0
    const rows = imgSrc ? Math.ceil((size.h + tileH) / tileH) : 0
    const imgs: React.ReactNode[] = []
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            imgs.push(
                <img
                    key={`${r}-${c}`}
                    src={imgSrc}
                    alt=""
                    draggable={false}
                    style={{
                        position: 'absolute',
                        left: c * tileW,
                        top: r * tileH,
                        width: tileW,
                        height: tileH,
                    }}
                />,
            )
        }
    }

    return (
        <div ref={rootRef} className={styles.pattern}>
            <div ref={innerRef} className={styles.inner}>
                {imgs}
            </div>
        </div>
    )
}
