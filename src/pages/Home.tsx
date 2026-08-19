import type { Team as TeamInfo } from '../App'
import Team from '../components/Team'

export default function Home({ team }: { team: TeamInfo }) {
    return (
        <section className="screen">
            <div className="screen_main">
                <Team team={team} />
                <span className="label" style={{color: team.headerColor}}>HANJUN CHO</span>
            </div>
        </section>
    )
}
