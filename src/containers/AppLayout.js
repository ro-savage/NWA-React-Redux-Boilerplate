import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

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
