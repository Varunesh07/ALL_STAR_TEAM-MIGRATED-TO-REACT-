import './LeaderBoard.css'
export function LeaderBoard() {
  return (
    <div className='leaderboard-container'>
      <div className='cap-section'>
        <h2 className='cap-title orange'>
          🟠 Orange Cap <span>Top Run Scorers</span>
        </h2>

        <div className='cap-list'>
          <div className='cap-card'>
            <div className='rank'>1</div>
            <div className='player-info'>
              <div className='player-icon rcb'>RC</div>
              <div>
                <h3 className='player-name'>Virat Kohli</h3>
                <span className='team-name'>RCB</span>
              </div>
            </div>

            <div className='score orange'>741</div>

            <div className='progress-bar orange-bar'>
              <div className='progress-fill' style={{ width: '100%' }}></div>
            </div>

            <div className='stats-row'>
              <span>
                Avg: <b>61.8</b>
              </span>
              <span>
                SR: <b>154.7</b>
              </span>
            </div>
          </div>

          <div className='cap-card'>
            <div className='rank'>2</div>
            <div className='player-info'>
              <div className='player-icon csk'>CS</div>
              <div>
                <h3 className='player-name'>Ruturaj Gaikwad</h3>
                <span className='team-name'>CSK</span>
              </div>
            </div>

            <div className='score orange'>583</div>

            <div className='progress-bar orange-bar'>
              <div className='progress-fill' style={{ width: '78%' }}></div>
            </div>

            <div className='stats-row'>
              <span>
                Avg: <b>53.0</b>
              </span>
              <span>
                SR: <b>141.2</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='cap-section'>
        <h2 className='cap-title purple'>
          🟣 Purple Cap <span>Top Wicket Takers</span>
        </h2>

        <div className='cap-list'>
          <div className='cap-card'>
            <div className='rank'>1</div>
            <div className='player-info'>
              <div className='player-icon kkr'>KK</div>
              <div>
                <h3 className='player-name'>Varun Chakravarthy</h3>
                <span className='team-name'>KKR</span>
              </div>
            </div>

            <div className='score purple'>21</div>

            <div className='progress-bar purple-bar'>
              <div className='progress-fill' style={{ width: '100%' }}></div>
            </div>

            <div className='stats-row'>
              <span>
                Avg: <b>16.8</b>
              </span>
              <span>
                Econ: <b>7.4</b>
              </span>
            </div>
          </div>

          <div className='cap-card'>
            <div className='rank'>2</div>
            <div className='player-info'>
              <div className='player-icon mi'>MI</div>
              <div>
                <h3 className='player-name'>Jasprit Bumrah</h3>
                <span className='team-name'>MI</span>
              </div>
            </div>

            <div className='score purple'>20</div>

            <div className='progress-bar purple-bar'>
              <div className='progress-fill' style={{ width: '95%' }}></div>
            </div>

            <div className='stats-row'>
              <span>
                Avg: <b>14.2</b>
              </span>
              <span>
                Econ: <b>6.5</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
