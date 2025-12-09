import { useState } from 'react'
import { NavBar } from '../shared/NavBar'
import './PlayerPage.css'
import data from '../data/data'
import { getInitials } from '../utils/getInitials'
import { getTeamAbbreviation } from '../utils/teamAbbreviation'
import { getRoleTagClass } from '../utils/roleTags'

const { player } = data

export function PlayerPage() {
  const Players = player.data
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [players, setPlayers] = useState([])

  return (
    <>
      <NavBar />
      <div className='container'>
        <h2 className='section-title'>Players</h2>

        <div className='players-grid'>
          {Players.map((Player) => {
            return (
              <div className='player-card' key={Player.PID}>
                <div className='top'>
                  <div
                    className={`player-icon ${getTeamAbbreviation(
                      Player.TeamName
                    ).toLowerCase()}`}
                  >
                    {getInitials(Player.PName)}
                  </div>
                  <div>
                    <h3 className='player-name'>{Player.PName}</h3>
                    <div className='tags'>
                      <span
                        className={`team-tag ${getTeamAbbreviation(
                          Player.TeamName
                        ).toLowerCase()}-tag`}
                      >
                        {getTeamAbbreviation(Player.TeamName)}
                      </span>
                      <span className={`role-${getRoleTagClass(Player.Role)}`}>
                        {Player.Role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='stats'>
                  <div className='stat-box'>
                    <p>Runs</p>
                    <h4>{Player.RunsScored}</h4>
                  </div>

                  <div className='action-row'>
                    <button
                      href='update.html'
                      className='action-btn update-btn'
                    >
                      <i className='fas fa-edit'></i>
                    </button>
                    <button
                      href='delete.html'
                      className='action-btn delete-btn'
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </div>
                  <div className='stat-box'>
                    <p>Wickets</p>
                    <h4>{Player.WicketsTaken}</h4>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
