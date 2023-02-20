import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {IoBagSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-item-container">
        <div className="company-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="description-heading">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
