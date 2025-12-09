import { useEffect, useState } from 'react'
import { getTeamAbbreviation } from '../utils/teamAbbreviation'
import { NavBar } from '../shared/NavBar'
import './LeaderBoard.css'

export function LeaderBoard() {
  const [orangeCap, setOrangeCap] = useState([])
  const [purpleCap, setPurpleCap] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/players/orangeCap')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrangeCap(data.data)
      })
      .catch((err) => console.error('Orange Cap fetch error:', err))
  }, [])

  // 🟣 Fetch Purple Cap (Wickets)
  useEffect(() => {
    fetch('http://localhost:3000/players/purpleCap')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPurpleCap(data.data)
      })
      .catch((err) => console.error('Purple Cap fetch error:', err))
  }, [])
  const maxRuns = orangeCap[0]?.RunsScored || 1
  const maxWickets = purpleCap[0]?.WicketsTaken || 1

  return (
    <>
      <NavBar />
      <div className='leaderboard-container'>
        <div className='cap-section'>
          <h2 className='cap-title orange'>
            🟠 Orange Cap <span>Top Run Scorers</span>
          </h2>

          <div className='cap-list'>
            {orangeCap.map((player, pos) => {
              const percent = (player.RunsScored / maxRuns) * 100

              return (
                <div className='cap-card' key={player.PID}>
                  <div className='rank'>{pos + 1}</div>

                  <div className='player-info'>
                    <div
                      className={`player-icon ${getTeamAbbreviation(
                        player.TeamName
                      ).toLowerCase()}`}
                    >
                      {getTeamAbbreviation(player.TeamName)}
                    </div>

                    <div>
                      <h3 className='player-name'>{player.PName}</h3>
                      <span className='team-name'>
                        {getTeamAbbreviation(player.TeamName)}
                      </span>
                    </div>
                  </div>

                  <div className='score orange'>{player.RunsScored}</div>

                  <div className='progress-bar orange-bar'>
                    <div
                      className='progress-fill'
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='cap-section'>
          <h2 className='cap-title purple'>
            🟣 Purple Cap <span>Top Wicket Takers</span>
          </h2>

          <div className='cap-list'>
            {purpleCap.map((player, pos) => {
              const percent = (player.WicketsTaken / maxWickets) * 100

              return (
                <div className='cap-card' key={player.PID}>
                  <div className='rank purple'>{pos + 1}</div>

                  <div className='player-info'>
                    <div
                      className={`player-icon ${getTeamAbbreviation(
                        player.TeamName
                      ).toLowerCase()}`}
                    >
                      {getTeamAbbreviation(player.TeamName)}
                    </div>

                    <div>
                      <h3 className='player-name'>{player.PName}</h3>
                      <span className='team-name'>
                        {getTeamAbbreviation(player.TeamName)}
                      </span>
                    </div>
                  </div>

                  <div className='score purple'>{player.WicketsTaken}</div>

                  <div className='progress-bar purple-bar'>
                    <div
                      className='progress-fill'
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
