import { useEffect, useState } from 'react'
import { NavBar } from '../shared/NavBar'
import { getInitials } from '../utils/getInitials'
import './AllStarTeam.css'

export function AllStarTeam() {
  const [team, setTeam] = useState([])

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch('http://localhost:3000/allstarteam')
        const data = await res.json()

        if (!data.success) {
          console.error('Failed to load All-Star Team')
          return
        }

        setTeam(data.data.allStarTeam)
      } catch (err) {
        console.error('Error loading All-Star XI:', err)
      }
    }

    loadTeam()
  }, [])

  return (
    <>
      <NavBar />
      <div className='allstar-container'>
        <h2 className='page-title'>🏆 All-Star XI</h2>
        <p className='subtitle'>
          Best 11 players selected using average evaluation score
        </p>

        <div className='allstar-grid'>
          {team.map((player) => (
            <div className='allstar-card' key={player.PID}>
              <div className='player-top'>
                <div className={`player-icon ${player.Role}`}>
                  {getInitials(player.PName)}
                </div>

                <div>
                  <h3 className='player-name'>
                    {player.PName}
                    {player.isCaptain && (
                      <span className='captain-badge'>CAPTAIN</span>
                    )}
                  </h3>

                  <div className='tags'>
                    <span className={`role-tag ${player.Role}`}>
                      {player.Role}
                    </span>
                  </div>
                </div>
              </div>

              <div className='stats'>
                <div className='stat-box'>
                  <p>Runs</p>
                  <h4>{player.RunsScored}</h4>
                </div>

                <div className='stat-box'>
                  <p>Wickets</p>
                  <h4>{player.WicketsTaken}</h4>
                </div>

                <div className='stat-box'>
                  <p>Eval Score</p>
                  <h4>{player.AvgEvalScore}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
