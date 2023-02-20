import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    //   <nav
    <nav className="nav-container">
      <Link to="/" className="link">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-website-logo"
          />
        </li>
      </Link>
      <ul>
        <li className="nav-components">
          <Link to="/" className="link">
            <h1 className="home-link">Home</h1>
          </Link>
          <Link to="/jobs" className="link">
            <h1 className="home-link">Jobs</h1>
          </Link>
        </li>
      </ul>
      <li>
        <button className="logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </li>
    </nav>
    // </nav>
  )
}
export default withRouter(Header)
