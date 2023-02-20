import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employTypeList: [],
    salaryTypeId: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, employTypeList, salaryTypeId} = this.state
    const employTypeString = employTypeList.join(',')
    console.log(employTypeString)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employTypeString}&minimum_package=${salaryTypeId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)

      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  NoResults = () => (
    <div className="no-results-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  onChangeTitle = event =>
    this.setState({searchInput: event.target.value}, this.getJobsDetails)

  renderJobDetailsView = () => {
    const {jobsList} = this.state
    return (
      <div>
        <div className="jobs-list-container">
          {jobsList.length > 0 ? (
            <ul className="job-item-list-container">
              {jobsList.map(eachJob => (
                <JobItem jobDetails={eachJob} />
              ))}
            </ul>
          ) : (
            this.NoResults()
          )}
        </div>
      </div>
    )
  }

  onEmploymentType = employmentType => {
    this.setState({employTypeList: employmentType}, this.getJobsDetails)
  }

  onPackageType = packageType => {
    this.setState({salaryTypeId: packageType}, this.getJobsDetails)
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#fff" height="50" width="50" />
      </div>
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
    const {employTypeList} = this.state
    console.log(employTypeList)

    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-container">
          <FiltersGroup
            onSelectEmploymentType={this.onEmploymentType}
            onSelectPackageType={this.onPackageType}
          />
          {/* {this.AllJobsSection()} */}
          <div className="search-final">
            <div className="search-bg-container">
              <div className="search-container">
                <input
                  type="search"
                  className="input-search"
                  onChange={this.onChangeTitle}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-btn"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}
export default AllJobsSection
