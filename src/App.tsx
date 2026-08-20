import { useEffect, useRef, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Timeline from './components/Timeline'

import frontaleLogo from './assets/frontale.png'
import frontaleBg from './assets/frontale_bg.jpg'
import spursLogo from './assets/spurs.png'
import spursBg from './assets/spurs_bg.jpg'
import koreaLogo from './assets/korea.png'
import koreaBg from './assets/korea_bg.jpg'

export interface Team {
    name: string
    city: string
    primaryColor: string
    secondaryColor: string
    tertiaryColor: string
    headerColor: string
    logo: string 
    bg: string
}

const TEAMS: Team[] = [
    {
        name: 'TOTTENHAM HOTSPUR',
        city: 'LONDON, ENGLAND',
        primaryColor: '#FFFFFF',
        secondaryColor: '#131F53',
        tertiaryColor: '#4A4A4A',
        headerColor: '#131F53',
        logo: spursLogo,
        bg: spursBg
    },
    {
        name: 'KOREA NATIONAL TEAM',
        city: 'SOUTH KOREA',
        primaryColor: '#EC0F32',
        secondaryColor: '#000000',
        tertiaryColor: '#8F0A20',
        headerColor: '#000000',
        logo: koreaLogo,
        bg: koreaBg
    },
    {
        name: 'KAWASAKI FRONTALE',
        city: 'KAWASAKI, JAPAN',
        primaryColor: '#3EA3DC',
        secondaryColor: '#000000',
        tertiaryColor: '#C1AD76',
        headerColor: '#000000',
        logo: frontaleLogo,
        bg: frontaleBg
    },
]

function App() {
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        let raf = 0
        const onScroll = () => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                const viewport = container.clientHeight
                const index = Math.min(
                    TEAMS.length - 1,
                    Math.max(0, Math.round(container.scrollTop / viewport)),
                )
                setActiveIndex(index)
            })
        }
        container.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => {
            container.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(raf)
        }
    }, [])

    const active = TEAMS[activeIndex]

    return (
        <>
            <div
                className="bg"
                style={{
                    ['--bg-overlay' as string]: active.primaryColor,
                    backgroundImage: active.bg ? `url(${active.bg})` : undefined,
                }}
            />
            <div className="app" ref={containerRef}>
                <Timeline color={active.secondaryColor} />
                <main className="screens">
                    <Home team={TEAMS[0]} />
                    <Experience team={TEAMS[1]} />
                    <Projects team={TEAMS[2]} />
                </main>
            </div>
        </>
    )
}

export default App
