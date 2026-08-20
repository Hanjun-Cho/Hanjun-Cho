import { useEffect, useRef } from 'react'
import styles from './KMNTPattern.module.css'

const DRIFT = 0.3
const SCALE = 2
const OCTAVES = 4
const FREQ = 0.02

const PALETTE = [
    { color: [10, 10, 10], weight: 0.23 },
    { color: [50, 50, 50], weight: 0.22 },
    { color: [90, 90, 90], weight: 0.17 },
    { color: [135, 135, 135], weight: 0.13 },
    { color: [185, 185, 185], weight: 0.08 },
]

function hash(x: number, y: number) {
    let n = x * 374761393 + y * 668265263
    n = (n ^ (n >> 13)) * 1274126177
    return ((n ^ (n >> 16)) >>> 0) / 4294967295
}

function smoother(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10)
}

function valueNoise(x: number, y: number) {
    const x0 = Math.floor(x)
    const y0 = Math.floor(y)
    const tx = smoother(x - x0)
    const ty = smoother(y - y0)
    const v00 = hash(x0, y0)
    const v10 = hash(x0 + 1, y0)
    const v01 = hash(x0, y0 + 1)
    const v11 = hash(x0 + 1, y0 + 1)
    const top = v00 + (v10 - v00) * tx
    const bottom = v01 + (v11 - v01) * tx
    return top + (bottom - top) * ty
}

function fbm(x: number, y: number) {
    let sum = 0
    let amp = 0.5
    let freq = 1
    let norm = 0
    for (let i = 0; i < OCTAVES; i++) {
        sum += valueNoise(x * freq, y * freq) * amp
        norm += amp
        amp *= 0.5
        freq *= 2.1
    }
    return sum / norm
}

export default function KMNTPattern() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const off = document.createElement('canvas')
        const octx = off.getContext('2d')
        if (!octx) return

        const cumulative = (() => {
            const arr: number[] = []
            let total = 0
            for (const { weight } of PALETTE) {
                total += weight
                arr.push(total)
            }
            return arr.map((v) => v / total)
        })()

        let raf = 0
        let offsetX = 0
        let offsetY = 0

        const draw = () => {
            const dpr = window.devicePixelRatio || 1
            const w = canvas.clientWidth
            const h = canvas.clientHeight
            if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
                canvas.width = w * dpr
                canvas.height = h * dpr
            }

            const rw = Math.max(1, Math.round(w / SCALE))
            const rh = Math.max(1, Math.round(h / SCALE))
            off.width = rw
            off.height = rh

            const img = octx.createImageData(rw, rh)
            const data = img.data
            let p = 0
            for (let y = 0; y < rh; y++) {
                for (let x = 0; x < rw; x++) {
                    const n = fbm((x * SCALE - offsetX) * FREQ, (y * SCALE + offsetY) * FREQ)
                    let idx = 0
                    for (let c = 0; c < cumulative.length; c++) {
                        if (n <= cumulative[c]) {
                            idx = c
                            break
                        }
                    }
                    const [r, g, b] = PALETTE[idx].color
                    data[p] = r
                    data[p + 1] = g
                    data[p + 2] = b
                    data[p + 3] = 70
                    p += 4
                }
            }
            octx.putImageData(img, 0, 0)

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx.clearRect(0, 0, w, h)
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(off, 0, 0, rw, rh, 0, 0, w, h)

            offsetX += DRIFT
            offsetY += DRIFT
            raf = requestAnimationFrame(draw)
        }

        raf = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(raf)
    }, [])

    return <canvas className={styles.kmtn} ref={canvasRef} aria-hidden="true" />
}
