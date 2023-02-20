import {Component} from 'react'
import Cookies from 'js-cookie'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const CheckBoxItem = props => {
  const {data, clickEmploymentType} = props
  const {label, employmentTypeId} = data

  return (
    <li className="checkbox-item">
      <input
        type="checkbox"
        value={employmentTypeId}
        id={label}
        onClick={clickEmploymentType}
      />
      <label htmlFor={label} className="label">
        {label}
      </label>
    </li>
  )
}

const RadioItem = props => {
  const {data, name, clickPackageType} = props
  const {label, salaryRangeId} = data
  return (
    <li className="checkbox-item">
      <input
        type="radio"
        id={label}
        name={name}
        onClick={clickPackageType}
        value={salaryRangeId}
      />
      <label htmlFor={label} className="label">
        {label}
      </label>
    </li>
  )
}

class FiltersGroup extends Component {
  state = {profileDetails: {}, clickedEmployTypeList: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  clickEmploymentType = event => {
    const {clickedEmployTypeList} = this.state
    if (event.target.checked) {
      clickedEmployTypeList.push(event.target.value)
      this.setState({clickedEmployTypeList}, this.sendEmployList)
    } else {
      const index = clickedEmployTypeList.indexOf(event.target.value)
      clickedEmployTypeList.splice(index, 1)
      this.setState({clickedEmployTypeList}, this.sendEmployList)
    }
  }

  sendEmployList = () => {
    const {clickedEmployTypeList} = this.state
    const {onSelectEmploymentType} = this.props
    onSelectEmploymentType(clickedEmployTypeList)
    // console.log(clickedEmployTypeList)
  }

  clickPackageType = event => {
    const {onSelectPackageType} = this.props
    onSelectPackageType(event.target.value)
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({profileDetails: updatedData})
  }

  render() {
    const {profileDetails} = this.state

    return (
      <div className="filters-bg-container">
        <Profile profileDetails={profileDetails} />
        <hr className="hr-line" />
        <div className="items-container">
          <h1 className="employment-types">Type of Employment</h1>
          <ul className="un-order">
            {employmentTypesList.map(each => (
              <CheckBoxItem
                key={each.employmentTypeId}
                data={each}
                type="checkbox"
                clickEmploymentType={this.clickEmploymentType}
              />
            ))}
          </ul>
        </div>
        <hr className="hr-line" />
        <div className="items-container">
          <h1 className="employment-types">Salary Range</h1>
          <ul className="un-order">
            {salaryRangesList.map(each => (
              <RadioItem
                key={each.salaryRangeId}
                data={each}
                type="radio"
                name="radio"
                clickPackageType={this.clickPackageType}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default FiltersGroup
