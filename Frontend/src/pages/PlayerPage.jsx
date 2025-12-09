import { useState, useEffect } from 'react'
import { NavBar } from '../shared/NavBar'
import './PlayerPage.css'

import { getInitials } from '../utils/getInitials'
import { getTeamAbbreviation } from '../utils/teamAbbreviation'
import { getRoleTagClass } from '../utils/roleTags'
import axios from 'axios'

export function PlayerPage() {
  const [allPlayers, setAllPlayers] = useState([])
  const [loadingPlayers, setLoadingPlayers] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [teamsList, setTeamsList] = useState([])
  useEffect(() => {
    fetchAllPlayers()
  }, [])

  async function fetchAllPlayers() {
    setLoadingPlayers(true)
    try {
      const response = await axios.get('http://localhost:3000/players/')

      setAllPlayers(response.data.data.players || [])
    } catch (err) {
      console.error('Error fetching all players:', err)
    } finally {
      setLoadingPlayers(false)
    }
  }

  async function fetchPlayerDetails(id) {
    setLoadingDetails(true)
    setSelectedPlayer(null)
    setTeamsList([])
    try {
      const response = await axios.get(`http://localhost:3000/players/${id}`)
      const playerData = response.data.data

      setSelectedPlayer(playerData.player[0])
      setTeamsList(playerData.teams || [])
    } catch (err) {
      console.error(`Error fetching player details for ID ${id}:`, err)
    } finally {
      setLoadingDetails(false)
    }
  }

  return (
    <>
      <NavBar />
      <div className='container'>
        <h2 className='section-title'>Players</h2>

        {loadingPlayers ? (
          <p>Loading player data...</p>
        ) : (
          <div className='players-grid'>
            {allPlayers.map((Player) => {
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
                        <span
                          className={`role-${getRoleTagClass(Player.Role)}`}
                        >
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

                    <div className='stat-box'>
                      <p>Wickets</p>
                      <h4>{Player.WicketsTaken}</h4>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
