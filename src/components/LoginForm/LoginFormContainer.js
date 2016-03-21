import React from 'react'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { requestLogin } from '../../redux/modules/user-auth/user-auth'
import autoBind from 'react-autobind'

class LoginFormContainer extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    message: React.PropTypes.string,
  };

  constructor() {
    super()
    autoBind(this)
    this.login.bind(this)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange(value, e) {
    this.setState({
      [e.target.name]: value,
    })
  }

  login() {
    this.props.dispatch(requestLogin(this.state))
  }

  changePage() {
    //http://localhost:3000/pages/about-us
    console.log('test')
    browserHistory.push('/pages/about-us')
  }

  render() {
    return (
      <div>
      <LoginForm {...this.props} {...this.state} handleChange={this.handleChange} handleLogin={this.login} />
        <button onClick={this.changePage}>navigate</button>
      </div>
    )
  }

}

const mapStateToProps = ({ userAuth }) => ({
  message: userAuth.message,
})

export default connect(mapStateToProps)(LoginFormContainer)
