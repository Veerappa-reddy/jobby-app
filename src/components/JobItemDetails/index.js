import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {IoBagSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import {GrShare} from 'react-icons/gr'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const SkillItem = props => {
  const {skills} = props

  return skills.map(each => (
    <li className="li-item">
      <img src={each.imageUrl} alt={each.name} className="skill-image" />
      <p className="skill-name">{each.name}</p>
    </li>
  ))
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    //   const {apiStatus} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        title: data.job_details.title,
      }
      const similarFetchedData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobItemDetails: updatedData,
        similarJobsList: similarFetchedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 400) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobItemDetails, apiStatus, similarJobsList} = this.state
    // console.log(similarJobsList)

    const {
      employmentType,
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      location,
      lifeAtCompany,
      skills,
      packagePerAnnum,
      rating,
      title,
    } = jobItemDetails

    return (
      <div className="job-item">
        <div className="job-item-details-container">
          <div className="job-item-container">
            <div className="company-role-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="role-container">
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="package-container">
              <div className="employee-details">
                <div className="location-container">
                  <GoLocation />
                  <p className="location">{location}</p>
                </div>
                <div className="location-container">
                  <IoBagSharp />
                  <p className="location">{employmentType}</p>
                </div>
              </div>
              <div>
                <p>{packagePerAnnum}</p>
              </div>
            </div>
            <hr />
            <div>
              <div className="company-url">
                <h1 className="description-heading">Description</h1>
                <div>
                  <a
                    href={companyWebsiteUrl}
                    className="share"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit
                    <GrShare />
                  </a>
                </div>
              </div>
              <p>{jobDescription}</p>
            </div>
          </div>
          <div>
            <h1 className="skills">Skills</h1>
            {apiStatus && (
              <ul className="unorder-list">
                <SkillItem skills={skills} />
              </ul>
            )}
          </div>
          <div>
            <h1 className="skills">Life at Company</h1>

            {apiStatus && (
              <div className="company-details-conatainer">
                <p className="company-description">
                  {lifeAtCompany.description}
                </p>
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="company-image"
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <h1 className="similar-job">Similar Jobs</h1>
          <ul className="similar-jobs">
            {similarJobsList.map(each => (
              <SimilarJobs jobDetail={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <Link to="/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-detail-bg-container">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
