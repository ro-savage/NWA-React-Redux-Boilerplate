import React from 'react'
import { connect } from 'react-redux'

import TopMenu from '../../components/TopMenu/TopMenu'
import LeftMenu from '../../components/LeftMenu/LeftMenu'

const PageLayout = (props) =>
  (
    <div className="layout-container">
      <TopMenu />
      <div className="menu-content-container">
        <LeftMenu />
        <div
          className={`${props.menuOpen ? 'main-content-menu-open' : 'main-content'}`}
          id="mainContent" style={{ backgroundColor: 'rgb(226, 226, 226)' }}
        >
          {props.children}
        </div>
      </div>
    </div>
  )

PageLayout.propTypes = {
  children: React.PropTypes.element,
  menuOpen: React.PropTypes.bool,
}
const mapStateToProps = ({ layout }) => ({ menuOpen: layout.menuOpen })


export default connect(mapStateToProps)(PageLayout)
