import { useState, useEffect } from 'react'
import { NavBar } from '../shared/NavBar'
import { getTeamAbbreviation } from '../utils/teamAbbreviation'
import { getRoleTagClass } from '../utils/roleTags'
import './TeamPage.css'
import axios from 'axios'

export function TeamPage() {
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [loadingTeams, setLoadingTeams] = useState(true)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [players, setPlayers] = useState([])
  const [coaches, setCoaches] = useState([])

  useEffect(() => {
    fetchTeams()
  }, [])

  async function fetchTeams() {
    setLoadingTeams(true)
    try {
      const response = await axios.get('http://localhost:3000/teams/')

      setTeams(response.data.data || [])
    } catch (err) {
      console.log('Error fetching teams:', err)
    } finally {
      setLoadingTeams(false)
    }
  }

  async function fetchTeamDetails(id) {
    setLoadingDetails(true)
    setSelectedTeam(null)

    try {
      const response = await axios.get(`http://localhost:3000/teams/${id}`)
      const teamData = response.data.data
      setSelectedTeam(teamData.team[0])
      setPlayers(teamData.players)
      setCoaches(teamData.coaches)
    } catch (err) {
      console.log('Error fetching team details:', err)
    } finally {
      setLoadingDetails(false)
    }
  }

  return (
    <>
      <NavBar />

      <div className='container'>
        <h2 className='section-title'>IPL Teams</h2>

        {loadingTeams ? (
          <p>Loading IPL teams...</p>
        ) : (
          <div className='teams-grid'>
            {teams.map((team) => {
              return (
                <div
                  className='team-card'
                  key={team.TeamID}
                  onClick={() => fetchTeamDetails(team.TeamID)}
                >
                  <div className='left'>
                    <div
                      className={`team-icon ${getTeamAbbreviation(
                        team.TeamName
                      ).toLowerCase()}`}
                    >
                      {getTeamAbbreviation(team.TeamName)}
                    </div>
                    <div>
                      <h3 className='team-name'>{team.TeamName}</h3>
                      <p className='team-short'>
                        {getTeamAbbreviation(team.TeamName)}
                      </p>
                    </div>
                  </div>

                  <div className='right'>
                    <p>
                      <span className='win'>{team.MatchesWon}W</span>{' '}
                      <span className='loss'>{team.MatchesLost}L</span>
                    </p>
                    <p className='points'>
                      Pts: <strong>{team.MatchesWon * 2}</strong>
                    </p>
                  </div>

                  <div className='team-actions'>
                    <button className='action-btn update'>
                      <i className='fa-solid fa-edit'></i>
                    </button>
                    <button className='action-btn delete'>
                      <i className='fa-solid fa-trash'></i>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selectedTeam && (
        <div className='team-table-container'>
          {loadingDetails ? (
            <p>Loading details for {selectedTeam.TeamName}...</p>
          ) : (
            <>
              <h2 className='team-title'>{selectedTeam.TeamName} Roster</h2>

              <div className='team-extra-stats'>
                <div className='stat-box'>
                  <p className='stat-label'>Championships</p>
                  <h3 className='stat-value'>{selectedTeam.Champions}</h3>
                </div>

                <div className='stat-box'>
                  <p className='stat-label'>Net Run Rate</p>
                  <h3 className='stat-value'>{selectedTeam.NRR}</h3>
                </div>

                <div className='stat-box'>
                  <p className='stat-label'>Matches</p>
                  <h3 className='stat-value'>
                    {selectedTeam.MatchesWon + selectedTeam.MatchesLost}
                  </h3>
                </div>
              </div>

              <table className='team-table'>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Role</th>
                    <th>Runs</th>
                    <th>Wkts</th>
                  </tr>
                </thead>

                <tbody>
                  {players.map((p) => (
                    <tr key={p.PID}>
                      <td>{p.PName}</td>
                      <td>
                        {' '}
                        <span className={getRoleTagClass(p.Role)}>
                          {p.Role}
                        </span>
                      </td>
                      <td>{p.RunsScored}</td>
                      <td>{p.WicketsTaken}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2 className='team-title' style={{ marginTop: '35px' }}>
                Coaches
              </h2>

              <table className='team-table'>
                <thead>
                  <tr>
                    <th>Coach</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {coaches.map((c) => (
                    <tr key={c.CoachID}>
                      <td>{c.CoachName}</td>
                      <td>
                        <span className={getRoleTagClass(c.Role)}>
                          {c.Role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </>
  )
}
