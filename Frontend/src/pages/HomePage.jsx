import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavBar } from '../shared/NavBar'
import { formatMatchDate } from '../utils/formatDate'
import { getTeamAbbreviation } from '../utils/teamAbbreviation'
import './HomePage.css'

export function HomePage() {
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [stats, setStats] = useState(null)

  const [selectedMatch, setSelectedMatch] = useState(null)
  const [loadingMatches, setLoadingMatches] = useState(true)
  const [loadingDetails, setLoadingDetails] = useState(false)

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await axios.get('http://localhost:3000/matches')

        if (!res.data.success) {
          console.error('Failed to load matches')
          return
        }

        setMatches(res.data.data.matches)
        setTeams(res.data.data.teams)
        setStats(res.data.data.stats[0])
      } catch (err) {
        console.error('Error loading matches:', err)
      } finally {
        setLoadingMatches(false)
      }
    }

    loadMatches()
  }, [])

  function attachTeamNames(matches, teams) {
    if (!teams.length) return matches

    const lookup = Object.fromEntries(teams.map((t) => [t.TEAMID, t.TEAMNAME]))

    return matches.map((m) => ({
      ...m,
      Team1Name: lookup[m.Team1ID],
      Team2Name: lookup[m.Team2ID],
    }))
  }

  const sorted = [...matches].sort(
    (a, b) => new Date(b.MatchDate) - new Date(a.MatchDate)
  )
  const recentSix = sorted.slice(0, 6)
  const updatedMatches = attachTeamNames(recentSix, teams)

  async function fetchMatchDetails(id) {
    setLoadingDetails(true)

    try {
      const res = await axios.get(`http://localhost:3000/matches/${id}`)

      const m = res.data.data.match
      const t = res.data.data.teams

      const team1 = t.find((x) => x.TEAMID === m.Team1ID).TEAMNAME
      const team2 = t.find((x) => x.TEAMID === m.Team2ID).TEAMNAME

      setSelectedMatch({
        ...m,
        Team1Name: team1,
        Team2Name: team2,
      })
    } catch (err) {
      console.error('Match details fetch error:', err)
    } finally {
      setLoadingDetails(false)
    }
  }

  function getMatchResult(team1Name, team2Name, team1Score, team2Score) {
    const [t1Runs, t1Wkts] = team1Score.split('-').map(Number)
    const [t2Runs, t2Wkts] = team2Score.split('-').map(Number)

    const t1Abbr = getTeamAbbreviation(team1Name)
    const t2Abbr = getTeamAbbreviation(team2Name)

    const target = t1Runs + 1

    if (t2Runs < t1Runs) {
      const margin = t1Runs - t2Runs
      return `${t1Abbr} won by ${margin} runs`
    }

    if (t2Runs >= target) {
      const wicketsLeft = 10 - t2Wkts
      return `${t2Abbr} won by ${wicketsLeft} wickets`
    }

    if (t1Runs === t2Runs) return 'Match tied'

    return 'Result not determined'
  }

  if (loadingMatches) {
    return (
      <>
        <NavBar />
        <div className='container'>
          <p>Loading matches...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar />
      <div className='container'>
        {stats && (
          <div className='stats-grid'>
            <div className='stat-card'>
              <p className='label'>Total Matches</p>
              <div className='value'>{matches.length}</div>
            </div>

            <div className='stat-card'>
              <p className='label'>Total Runs</p>
              <div className='value'>{stats.RUNSSCORED}</div>
            </div>

            <div className='stat-card'>
              <p className='label'>Total Wickets</p>
              <div className='value'>{stats.WICKETSTAKEN}</div>
            </div>

            <div className='stat-card'>
              <p className='label'>Balls Faced</p>
              <div className='value'>{stats.BALLSFACED}</div>
            </div>
          </div>
        )}

        <h2 className='section-title'>Recent Matches</h2>

        <div className='matches-grid'>
          {updatedMatches.map((mat) => (
            <div
              className='match-card'
              key={mat.MatchID}
              onClick={() => fetchMatchDetails(mat.MatchID)}
            >
              <span className='status'>Completed</span>

              <p className='date'>{formatMatchDate(mat.MatchDate)}</p>

              <div className='teams'>
                <div className='team-column'>
                  <div
                    className={`team-icon ${getTeamAbbreviation(
                      mat.Team1Name
                    ).toLowerCase()}`}
                  >
                    {getTeamAbbreviation(mat.Team1Name)}
                  </div>

                  <p className='team-score'>{mat.Team1Score}</p>
                </div>

                <p className='vs'>vs</p>

                <div className='team-column'>
                  <div
                    className={`team-icon ${getTeamAbbreviation(
                      mat.Team2Name
                    ).toLowerCase()}`}
                  >
                    {getTeamAbbreviation(mat.Team2Name)}
                  </div>

                  <p className='team-score'>{mat.Team2Score}</p>
                </div>
              </div>

              <p className='venue'>{mat.Venue}</p>

              <p className='winner'>
                {getMatchResult(
                  mat.Team1Name,
                  mat.Team2Name,
                  mat.Team1Score,
                  mat.Team2Score
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedMatch && (
        <div id='match-details-box' className='match-details'>
          <h2>Match Details</h2>

          {loadingDetails ? (
            <p>Loading...</p>
          ) : (
            <table>
              <tbody>
                <tr>
                  <th>Teams</th>
                  <td>
                    {selectedMatch.Team1Name} vs {selectedMatch.Team2Name}
                  </td>
                </tr>

                <tr>
                  <th>Venue</th>
                  <td>{selectedMatch.Venue}</td>
                </tr>

                <tr>
                  <th>Date</th>
                  <td>{formatMatchDate(selectedMatch.MatchDate)}</td>
                </tr>

                <tr>
                  <th>Score</th>
                  <td>
                    {selectedMatch.Team1Score} vs {selectedMatch.Team2Score}
                  </td>
                </tr>

                <tr>
                  <th>Man of the Match</th>
                  <td>{selectedMatch.PName}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  )
}
