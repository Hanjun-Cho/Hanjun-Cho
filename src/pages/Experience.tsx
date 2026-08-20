import type { Team as TeamInfo } from '../App'
import Team from '../components/Team'
import KMNTPattern from '../components/KMNTPattern'
export default function Experience({ team }: { team: TeamInfo }) {
    return (
        <section className="screen">
            <KMNTPattern/>
            <div className="screen_main">
                <Team team={team} />
            </div>
        </section>
    )
}
