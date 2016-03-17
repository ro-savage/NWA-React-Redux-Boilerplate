/* @flow */
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { requestLogin } from '../../redux/modules/user-auth/user-auth'
import autoBind from 'react-autobind'

class LoginForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    handleLogin: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  constructor() {
    super()
    autoBind(this)
    this.state = {
      user: {
        username: '',
        password: '',
      },
    }
  }

  handleChange(value, e) {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: value,
      },
    })
  }

  render() {
    const {
      username,
      password,
      message,
      handleChange,
      handleLogin,
      } = this.props

    return (
      <div>
        <h1>Test login</h1>
        <Input type="text" name="username" label="Email address" icon="person"
          value={username} onChange={handleChange}
        />
        <Input type="password" name="password" label="Password" icon="lock"
          value={password} onChange={handleChange}
        />
        <Button raised primary onClick={handleLogin}>Login!</Button>
        <div>{message}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ userAuth }) => ({
  userAuth,
})

export default connect(mapStateToProps)(LoginForm)
