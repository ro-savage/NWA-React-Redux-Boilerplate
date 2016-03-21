import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-toolbox/lib/button'

import { toggleMenu } from '../../redux/modules/layout/layout'

const LeftMenu = (props) => {
  const handleClick = () => {
    props.dispatch(toggleMenu())
  }
  return (
    <div className={`gridBox ${props.menuOpen ? 'left-menu-open' : 'left-menu'}`} id="leftMenu" >
      <Button
        onClick={handleClick}
        icon="open_with"
        floating accent
      />
    </div>
  )
}

LeftMenu.propTypes = {
  menuOpen: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
}

const mapStateToProps = ({ layout }) => (
  { menuOpen: layout.menuOpen }
)

export default connect(mapStateToProps)(LeftMenu)
