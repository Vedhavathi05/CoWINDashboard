import Loader from 'react-loader-spinner'

import {Component} from 'react'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

class CowinDashboard extends Component {
  state = {
    APIStatus: 'INACTIVE',
    values: [],
  }

  componentDidMount() {
    this.callAPI()
  }

  callAPI = async () => {
    this.setState({APIStatus: 'PROGRESS'})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({APIStatus: 'SUCCESS', values: data})
    } else {
      this.setState({APIStatus: 'FAILURE'})
    }
  }

  showRespectiveView = () => {
    const {APIStatus} = this.state
    switch (APIStatus) {
      case 'PROGRESS':
        return this.showProgressView()
      case 'SUCCESS':
        return this.showSuccessView()

      case 'FAILURE':
        return this.showFailureView()
      default:
        return null
    }
  }

  showProgressView = () => {
    console.log('Progress view')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }

  showSuccessView = () => {
    const {values} = this.state
    console.log(values.last_7_days_vaccination)
    console.log(values.vaccination_by_gender)
    console.log(values.vaccination_by_age)

    return (
      <div>
        <VaccinationCoverage vaccine={values.last_7_days_vaccination} />
        <VaccinationByGender genderDetails={values.vaccination_by_gender} />
        <VaccinationByAge ageDetails={values.vaccination_by_age} />
      </div>
    )
  }

  showFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="Failure-view-heading">Something went wrong</h1>
    </div>
  )

  render() {
    return (
      <div style={{backgroundColor: ' #161625', width: 1380, height: 1500}}>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWIN VAccination In India</h1>
        {this.showRespectiveView()}
      </div>
    )
  }
}

export default CowinDashboard
