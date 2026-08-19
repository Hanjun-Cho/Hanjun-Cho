import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './Projects.module.css'
import type { Team as TeamInfo } from '../App'
import ExpandingTimeline from '../components/ExpandingTimeline'
import KawasakiPattern from '../components/KawasakiPattern'
import Team from '../components/Team'
import estateAi from '../assets/description/Estate AI.md?raw'
import vpnGateClient from '../assets/description/VPN Gate Client.md?raw'
import winbar from '../assets/description/Winbar.md?raw'
import chalkboardMirror from '../assets/description/Chalkboard Mirror.md?raw'

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
        subtitle: 'Hack@Brown 2026 FetchAI Challenge Track Winner',
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
        subtitle: 'Desktop VPN client that dynamically discovers and filters public OpenVPN relay servers',
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
        subtitle: 'Full-stack analytics platform built in React to display advanced football statistics and action maps',
        tags: [
            { label: 'React', color: '#C1AD76' },
            { label: 'FastAPI', color: '#C1AD76' },
            { label: 'Python', color: '#C1AD76' },
            { label: 'D3.js', color: '#C1AD76' },
            { label: 'Playwright', color: '#C1AD76' },
        ],
    },
]

const descriptions: Record<string, string> = {
    'Estate AI': estateAi,
    'VPN Gate Client': vpnGateClient,
    'Winbar': winbar,
    'Chalkboard Mirror': chalkboardMirror,
}

export default function Projects({ team }: { team: TeamInfo }) {
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null)

    return (
        <section className="screen">
            <KawasakiPattern/>
            <div className="screen_main">
                <Team team={team} />
                <ExpandingTimeline experiences={experiences} onSelect={setSelectedTitle}/>
                <div className={styles.description}>
                    {selectedTitle && descriptions[selectedTitle] && (
                        <ReactMarkdown>{descriptions[selectedTitle]}</ReactMarkdown>
                    )}
                </div>
            </div>
        </section>
    )
}
