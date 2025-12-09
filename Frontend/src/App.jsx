import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { TeamPage } from './pages/TeamPage'
import { PlayerPage } from './pages/PlayerPage'
import { LeaderBoard } from './pages/LeaderBoard'
import { AllStarTeam } from './pages/AllStarTeam'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='teams' element={<TeamPage />} />
      <Route path='players' element={<PlayerPage />} />
      <Route path='leaderboard' element={<LeaderBoard />} />
      <Route path='ast' element={<AllStarTeam />} />
    </Routes>
  )
}

export default App
