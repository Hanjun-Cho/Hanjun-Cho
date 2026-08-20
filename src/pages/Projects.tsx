import { useState } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import styles from './Projects.module.css'
import type { Team as TeamInfo } from '../App'
import ExpandingTimeline from '../components/ExpandingTimeline'
import KawasakiPattern from '../components/KawasakiPattern'
import Team from '../components/Team'
import estateAi from '../assets/description/Estate AI.md?raw'
import vpnGateClient from '../assets/description/VPN Gate Client.md?raw'
import winbar from '../assets/description/Winbar.md?raw'
import chalkboardMirror from '../assets/description/Chalkboard Mirror.md?raw'
import thisWebsite from '../assets/description/This Website.md?raw'
import vpnGateImage from '../assets/description/VPNGate.png'
import winbarVideo from '../assets/description/Winbar Demo.mp4'
import chalkboardVideo from '../assets/description/Chalkboard Demo.mp4'
import winbarImage from '../assets/description/Winbar.png'
import estateAiImage from '../assets/description/EstateAI.png'

export interface Tag {
    label: string
    color: string
}

export interface TimelineEntry {
    id: number
    title: string
    subtitle: string
    tags: Tag[]
}

const experiences: TimelineEntry[] = [
    {
        id: 0,
        title: 'Estate AI',
        subtitle: 'AI-powered real estate investment analysis platform with automated underwriting and property-specific investment insights',
        tags: [
            { label: 'React', color: '#C1AD76' },
            { label: 'FastAPI', color: '#C1AD76' },
            { label: 'Python', color: '#C1AD76' },
            { label: 'MongoDB', color: '#C1AD76' },
        ],
    },
    {
        id: 1,
        title: 'VPN Gate Client',
        subtitle: 'Windows VPN client that concurrently validates public OpenVPN relay servers and filters unavailable endpoints',
        tags: [
            { label: 'PySide6', color: '#C1AD76' },
            { label: 'Python', color: '#C1AD76' },
            { label: 'OpenVPN', color: '#C1AD76' },
        ],
    },
    {
        id: 2,
        title: 'Winbar',
        subtitle: 'Extensible, module-based utility bar for Windows',
        tags: [
            { label: 'PySide6', color: '#C1AD76' },
            { label: 'Python', color: '#C1AD76' },
        ],
    },
    {
        id: 3,
        title: 'Chalkboard Mirror',
        subtitle: 'Full-stack football analytics platform for extracting, processing, and visualizing advanced match data',
        tags: [
            { label: 'React', color: '#C1AD76' },
            { label: 'FastAPI', color: '#C1AD76' },
            { label: 'Python', color: '#C1AD76' },
            { label: 'D3.js', color: '#C1AD76' },
            { label: 'Playwright', color: '#C1AD76' },
        ],
    },
    {
        id: 4,
        title: 'This Website',
        subtitle: 'How much explaination does that need?',
        tags: [
            { label: 'React', color: '#C1AD76' },
            { label: 'Figma', color: '#C1AD76' },
        ],
    },
]

const descriptions: Record<string, string> = {
    'Estate AI': estateAi.replace('./EstateAI.png', estateAiImage),
    'VPN Gate Client': vpnGateClient.replace('./VPNGate.png', vpnGateImage),
    'Winbar': winbar
        .replace('./Winbar.png', winbarImage)
        .replace('./Winbar%20Demo.mp4', winbarVideo),
    'Chalkboard Mirror': chalkboardMirror
        .replace('./Chalkboard%20Demo.mp4', chalkboardVideo),
    'This Website': thisWebsite,
}

const renderVideo: Components['img'] = ({ src, alt }) => {
    if (src?.endsWith('.mp4') || src?.endsWith('.webm')) {
        return <video src={src} controls />
    }
    return <img src={src} alt={alt} />
}

export default function Projects({ team }: { team: TeamInfo }) {
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null)

    return (
        <section className="screen">
            <KawasakiPattern/>
            <div className="screen_main">
                <Team team={team} />
                <ExpandingTimeline experiences={experiences} onSelect={setSelectedTitle}/>
                <div className={`${styles.description} ${!selectedTitle ? styles.hidden : ''}`}>
                    <button className={styles.close} onClick={() => setSelectedTitle(null)} aria-label="Close project description">
                        &times;
                    </button>
                    <div className={styles.description_container}>
                        {selectedTitle && descriptions[selectedTitle]
                            ? <ReactMarkdown components={{ img: renderVideo }}>{descriptions[selectedTitle]}</ReactMarkdown>
                            : 
                                <div className={styles.empty}>
                                    <span className={styles.empty_title}>Select a project on the left to learn more...</span>
                                    <span className={styles.empty_desc}>Just a small introduction to the project, a picture, maybe a video and just the thought process of why I even made the project to begin with :)</span>
                                </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}
