/* @flow */
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

import styles from './LoginForm.scss'

class LoginForm extends Component {
  static propTypes = {
    message: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    handleLogin: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      email,
      password,
      message,
      handleChange,
      handleLogin,
      } = this.props

    return (
      <div>
        <Input type="text" name="email" label="Email address" icon="person"
          value={email} onChange={handleChange}
        />
        <Input type="password" name="password" label="Password" icon="lock"
          value={password} onChange={handleChange}
        />
        <Button raised primary onClick={handleLogin} className={styles.loginButton}>Login!</Button>
        <div>{message}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ userAuth }) => ({
  userAuth,
})

export default connect(mapStateToProps)(LoginForm)
