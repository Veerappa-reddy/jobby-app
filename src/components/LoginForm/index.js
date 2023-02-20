import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsgStatus: false, errorMsg: ''}

  onChangeUserName = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => this.setState({errorMsgStatus: true, errorMsg})

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="username-label">
          USERNAME
        </label>
        <input
          id="username"
          className="username-input-field"
          placeholder="USERNAME"
          type="text"
          value={username}
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="username-label">
          PASSWORD
        </label>
        <input
          id="password"
          className="password-input-field"
          placeholder="PASSWORD"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onLoginSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, errorMsgStatus} = this.state

    return (
      <div className="login-bg-container">
        <form className="login-container" onSubmit={this.onLoginSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="user-name-container">
            {this.renderUsernameField()}
          </div>
          <div className="user-name-container">
            {this.renderPasswordField()}
          </div>
          <div className="button-container">
            <button className="login-btn" type="submit">
              Login
            </button>
            {errorMsgStatus && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
