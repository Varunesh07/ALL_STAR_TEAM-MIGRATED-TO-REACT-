import { Link } from 'react-router'
import './navbar.css'

export function NavBar() {
  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <div className='nav-logo'>🏆</div>
        <div className='nav-title'>
          <h1>IPL 2024</h1>
          <p>Cricket Analytics</p>
        </div>
      </div>

      <div className='nav-links'>
        <Link to='/'>
          {' '}
          <span className='icon'>📈</span> Overview{' '}
        </Link>
        <Link to='/teams'>
          {' '}
          <span className='icon'>👥</span> Teams{' '}
        </Link>
        <Link to='/players'>
          {' '}
          <span className='icon'>🏏</span> Players{' '}
        </Link>
        <Link to='/leaderboard'>
          <span className='icon'>📊</span> Leaderboards
        </Link>
        <Link to='/ast.html'>
          {' '}
          <span className='icon'>⭐</span> All Star Team{' '}
        </Link>
      </div>
    </nav>
  )
}
