import React from 'react'
import LoginFormContainer from '../../components/LoginForm/LoginFormContainer'

import styles from './LoginPage.scss'

const LoginPage = () => {
  return (
    <div className={`flexgrid-container-fluid ${styles.loginContainer}`}>
      <div className={`row middle-xs center-xs ${styles.row}`}>
        <div className="col-md-40 col-xs-90">
          <LoginFormContainer />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
