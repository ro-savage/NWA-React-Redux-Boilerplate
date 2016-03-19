import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MainHeader from '../containers/MainHeader/MainHeader'
import MainFooter from '../components/MainFooter/MainFooter'
import Spinner from '../components/Spinner/Spinner'
import ReactGridLayout from 'react-grid-layout'

const mapStateToProps = ({ spinner }) => ({ spinner })
const GridPageLayout = (props) =>
  (
    <div className="page-container">
      <div className="view-container">
        {props.children}
      </div>
    </div>
  )

GridPageLayout.propTypes = {
  spinner: PropTypes.object,
  children: PropTypes.element,
}

export default connect(mapStateToProps)(GridPageLayout)
