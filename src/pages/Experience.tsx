import styles from './Experience.module.css'
import type { Team as TeamInfo } from '../App'
import Team from '../components/Team'
import KMNTPattern from '../components/KMNTPattern'
import ExperienceItem from '../components/ExperienceItem'
import { useRef } from 'react'

export interface ExperienceEntry {
    id: number
    company: string
    position: string
    thoughts: string
    location: string
    duration: string
}

const experiences: ExperienceEntry[] = [
    {
        id: 0,
        company: 'Northeastern University',
        position: 'Incoming Teaching Assistant, CS3100',
        thoughts: 'Havent started this one yet... ask me again in December :|',
        location: 'Boston, Massachusetts',
        duration: 'Sep 2026 - Dec 2026'
    },
    {
        id: 1,
        company: 'Sports Interactive, SEGA',
        position: 'Football Manager Assistant Researcher',
        thoughts: "I've been playing Football Manager since I was 13 (i'm just clocking that 2018 is 8 years ago...) and I've always wanted to contribute to the game that has kept me busy for thousands of hours through the years. I managed to get an assistant researcher position with the Japanese research group where the original plan was to cover 1-2 teams before moving onto more - it's safe to say I've progressed *a little* further than 1-2 teams (60). I get to watch a ton of football, track players, and, as objectively as possible, grade them for the game database (the same database used by hundreds of pro clubs around the world). On a side note, football data is so messy... each platform has its own IDs and even the names are formatted differently... it's the main reason I built an internal data pipeline to link them because otherwise surfing through thousands of names is just a dumb way to spend our precious time :)",
        location: 'Remote',
        duration: 'Mar 2026 - Present'
    },
    {
        id: 2,
        company: 'ShinwooTNS',
        position: 'Cloud Security Engineer, Contract',
        thoughts: "This was the first time working in a professional IT environment and it was definitely not what I was expecting (though, cloud security was definitely not something on my career bingo card). Most of our time was surprisingly idle... mainly researching new security features from Cato or answering emails. But when something did go wrong with a client's connection, the tension goes through the roof, having to quickly filter through the millions of network actions to find the issue and propose solutions before the lack of connectivity becomes a bigger issue. We got to work with clients from all around the world - Indonesia, Vietnam, Korea, Ukraine one time, and Bangladesh. It was definitely a learning experience but it did make me realize how much I loved actually actively making things rather than reactively troubleshooting.",
        location: 'Ilsan, South Korea',
        duration: 'May 2026 - Jul 2026'
    },
    {
        id: 3,
        company: 'Republic of Korea Army (R.O.K.A)',
        position: 'HQ Battery Administrative and Supply Section Leader',
        thoughts: 'Served my 18 months of compulsory military service during this period and I was thankfully selected as one of the lucky soldiers to be working in front of a computer all day (the summers and winters were intense... 40cm of snow in the winter, 100mm per hour of rain in the summer...). I was responsible for handling the administrative records and supply inventory for the company of ~50 people. The old, manual system was, in all honesty, tedious and annoying, so I automated a lot of the repetitive tasks (holiday tracking, promotion eligibility etc) on Excel. Pro: learned a lot about excel, Cons: I still get asked how to use it...',
        location: 'Paju, South Korea',
        duration: 'May 2024 - Nov 2025'
    },
]

export default function Experience({ team }: { team: TeamInfo }) {
    const trackRef = useRef<HTMLDivElement>(null)
    const drag = useRef({ active: false, startX: 0, startScroll: 0 })

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = trackRef.current
        if (!el) return
        drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft }
        el.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = trackRef.current
        if (!el || !drag.current.active) return
        el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX)
    }

    const onPointerUp = () => {
        drag.current.active = false
    }

    return (
        <section className="screen">
            <KMNTPattern/>
            <div className="screen_main">
                <Team team={team} />
                <div className={styles.timeline}></div>
                <div
                    ref={trackRef}
                    className={styles.experiences}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                {experiences.map((exp, i) => (
                    <ExperienceItem
                        key={exp.id}
                        company={exp.company}
                        position={exp.position}
                        duration={exp.duration}
                        location={exp.location}
                        thoughts={exp.thoughts}
                        above={i % 2 === 0}
                    />
                ))}
                </div>
            </div>
        </section>
    )
}
