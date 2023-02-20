import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-text-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs,salaray information,company
          reviews.Find the that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button type="button" className="find-job-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
