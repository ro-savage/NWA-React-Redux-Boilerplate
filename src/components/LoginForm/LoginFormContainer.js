import React from 'react'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
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

  render() {
    return (
      <LoginForm {...this.props} {...this.state} handleChange={this.handleChange} handleLogin={this.login} />
    )
  }

}

const mapStateToProps = ({ userAuth }) => ({
  message: userAuth.message,
})

export default connect(mapStateToProps)(LoginFormContainer)
