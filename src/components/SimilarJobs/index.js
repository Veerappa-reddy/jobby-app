import {AiFillStar} from 'react-icons/ai'
// import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {IoBagSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobs = props => {
  const {jobDetail} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetail

  return (
    <li className="similar-job-container">
      <div className="company-role-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-img"
        />
        <div className="similar-job-role-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar color="#fbbf24" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading head">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="employee-details loc">
        <div className="location-container">
          <GoLocation />
          <p className="location">{location}</p>
        </div>
        <div className="location-container">
          <IoBagSharp />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
