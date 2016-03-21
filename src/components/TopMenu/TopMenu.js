import React from 'react'
import { IconButton } from 'react-toolbox/lib/button'
import { connect } from 'react-redux'
import { toggleMenu } from '../../redux/modules/layout/layout'

const TopMenu = (props) => {
  const handleClick = () => {
    props.dispatch(toggleMenu())
  }
  return (
    <div className="top-menu gridBox" >
      <IconButton icon="menu" onClick={handleClick} className="burgerMenuBtn" />
      <span>Menu Item | Menu Item | Menu Item | Menu Item</span>
    </div>
  )
}

TopMenu.propTypes = {
  menuOpen: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
}

const mapStateToProps = ({ layout }) => (
{ menuOpen: layout.menuOpen }
)

export default connect(mapStateToProps)(TopMenu)
