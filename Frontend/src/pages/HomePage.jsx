import { useState } from 'react'
import { NavBar } from '../shared/NavBar'
import data from '../data/data'
import { formatMatchDate } from '../utils/formatDate'
import { getTeamAbbreviation } from '../utils/teamAbbreviation'
import './HomePage.css'

const { match } = data

export function HomePage() {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const Match = match.data.matches
  const sorted = [...Match].sort((a, b) => {
    return new Date(b.MatchDate) - new Date(a.MatchDate)
  })

  const recentSix = sorted.slice(0, 6)

  function attachTeamNames(matches, teams) {
    const lookup = Object.fromEntries(teams.map((t) => [t.TEAMID, t.TEAMNAME]))

    return matches.map((m) => ({
      ...m,
      Team1Name: lookup[m.Team1ID],
      Team2Name: lookup[m.Team2ID],
    }))
  }

  const updatedMatches = attachTeamNames(recentSix, match.data.teams)

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

    if (t1Runs === t2Runs) {
      return 'Match tied'
    }

    return 'Result not determined'
  }

  function fetchMatchDetails(id) {
    setLoadingDetails(true)

    fetch(`http://localhost:3000/matches/${id}`)
      .then((res) => res.json())
      .then((res) => {
        const m = res.data.match
        const t = res.data.teams

        const team1 = t.find((x) => x.TEAMID === m.Team1ID).TEAMNAME
        const team2 = t.find((x) => x.TEAMID === m.Team2ID).TEAMNAME

        setSelectedMatch({
          ...m,
          Team1Name: team1,
          Team2Name: team2,
        })

        setLoadingDetails(false)
      })
  }
  console.log(match.data.stats[0].RUNSSCORED)

  return (
    <>
      <NavBar />
      <div className='container'>
        <div className='stats-grid'>
          <div className='stat-card'>
            <p className='label'>Total Matches</p>
            <div className='value'>{Match.length}</div>
          </div>

          <div className='stat-card'>
            <p className='label'>Total Runs</p>
            <div className='value'>{match.data.stats[0].RUNSSCORED}</div>
          </div>

          <div className='stat-card'>
            <p className='label'>Total Wickets</p>
            <div className='value'>{match.data.stats[0].WICKETSTAKEN}</div>
          </div>

          <div className='stat-card'>
            <p className='label'>Balls Faced</p>
            <div className='value'>{match.data.stats[0].BALLSFACED}</div>
          </div>
        </div>

        <h2 className='section-title'>Recent Matches</h2>

        <div className='matches-grid'>
          {updatedMatches.map((mat) => {
            return (
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
            )
          })}
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
                  <td id='md-teams'>
                    {selectedMatch.Team1Name} vs {selectedMatch.Team2Name}
                  </td>
                </tr>
                <tr>
                  <th>Venue</th>
                  <td id='md-venue'>{selectedMatch.Venue}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td id='md-date'>
                    {formatMatchDate(selectedMatch.MatchDate)}
                  </td>
                </tr>
                <tr>
                  <th>Score</th>
                  <td id='md-score'>
                    {selectedMatch.Team1Score} vs {selectedMatch.Team2Score}
                  </td>
                </tr>
                <tr>
                  <th>Man of the Match</th>
                  <td id='md-mom'>{selectedMatch.PName}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  )
}
