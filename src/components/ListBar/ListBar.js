import React from 'react'
import styles from './ListBar.scss'
import FontIcon from 'react-toolbox/lib/font_icon'

export default class ListBar extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    current: React.PropTypes.bool,
    extension: React.PropTypes.bool,
  }

  addExtension(required) {
    if (required) {
      return (
        <div className={styles.ext}>
          <div className={styles.block}></div><div className={styles.triangle}></div>
        </div>
      )
    }
    return null
  }

  createClasses() {
    const classes = []

    if (this.props.current) {
      classes.push(styles.current)
    } else {
      classes.push(styles.listbar)
    }

    if (this.props.extension) {
      classes.push(styles.extension)
    }

    return classes.join(' ')
  }

  render() {
    return (
      <div>
        <div className={this.createClasses()}>
          <div className={styles.mainbar}>
              <FontIcon value="check_circle" />{this.props.text}
          </div>
          {this.addExtension(this.props.extension)}
        </div>
      </div>
    )
  }
}
