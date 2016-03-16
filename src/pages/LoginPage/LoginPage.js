/* @flow */
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { requestLogin } from '../../redux/modules/user-auth/user-auth'
import autoBind from 'react-autobind'

class LoginPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
  };

  constructor() {
    super()
    autoBind(this)
    this.state = {
      user: {
        username: '',
        password: '',
      },
      message: 'test',
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

  login() {
    this.props.dispatch(requestLogin(this.state))
  }

  render() {
    return (
      <div>
        <h1>Test login</h1>
        <Input type="text" name="username" label="Email address" icon="person"
          value={this.state.user.username} onChange={this.handleChange}
        />
        <Input type="password" name="password" label="Password" icon="lock"
          value={this.state.user.password} onChange={this.handleChange}
        />
        <Button raised primary onClick={this.login}>Login!</Button>
        <div>{this.props.message}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ userAuth }) => ({
  message: userAuth.message,
})

export default connect(mapStateToProps)(LoginPage)
