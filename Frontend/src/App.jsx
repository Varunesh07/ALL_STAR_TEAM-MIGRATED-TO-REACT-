import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { TeamPage } from './pages/TeamPage'
import { PlayerPage } from './pages/PlayerPage'
import { LeaderBoard } from './pages/LeaderBoard'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='teams' element={<TeamPage />} />
      <Route path='players' element={<PlayerPage />}></Route>
      <Route path='leaderboard' element={<LeaderBoard />}></Route>
    </Routes>
  )
}

export default App
